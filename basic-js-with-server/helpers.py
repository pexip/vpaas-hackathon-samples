import time
from dataclasses import dataclass
from uuid import uuid1

from aiohttp import ClientSession, ClientResponseError
from authlib.jose import jwt
from fastapi import HTTPException

from constants import CRUD_ADDRESS, CLIENT_ID, CLIENT_KEY, SCOPES
from logger import LOGGER


@dataclass
class AuthToken:
    token_type: str
    access_token: str
    expires_in: int


async def request_auth_token(
    session: ClientSession, client_id: str, client_key: str, scopes: frozenset[str]
) -> AuthToken:
    """Request an auth token"""
    now = time.time()
    claims = {
        "iss": client_id,
        "sub": client_id,
        "aud": f"{CRUD_ADDRESS}/oauth/token",
        "exp": now + 60,
        "nbf": now - 30,
        "iat": now,
        "jti": str(uuid1()),
        "scope": " ".join(scopes),
    }

    client_assertion = jwt.encode(
        header={"alg": "RS384"}, payload=claims, key=client_key
    ).decode()
    data = {
        "grant_type": "client_credentials",
        "client_assertion": client_assertion,
        "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
    }
    LOGGER.debug("Requesting JWT", extra={"claims": claims})
    body = None
    try:
        async with session.post(f"{CRUD_ADDRESS}/oauth/token", data=data) as response:
            body = await response.json()
        response.raise_for_status()
        return AuthToken(body["token_type"], body["access_token"], body["expires_in"])
    except ClientResponseError as err:
        request_id = err.headers.get("X-Request-ID") if err.headers else None
        LOGGER.error(
            "Failed to request access token. Status=%s. Response=%s. Body=%s, RequestID=%s",
            err.status,
            err.message,
            body,
            request_id,
        )
        raise HTTPException(status_code=err.status, detail=body, headers={"X-Request-ID": request_id})


async def make_authorized_request(
    endpoint: str, method: str = "POST", json: dict | None = None
) -> dict:
    async with ClientSession() as session:
        auth_token = await request_auth_token(session, CLIENT_ID, CLIENT_KEY, SCOPES)
        session.headers["Authorization"] = (
            f"{auth_token.token_type} {auth_token.access_token}"
        )
        async with session.request(
            method, f"{CRUD_ADDRESS}/v1/meetings{endpoint}", json=json or {}
        ) as response:
            body = await response.json()
            request_id = response.headers.get("X-Request-ID")
            if response.ok:
                LOGGER.info("Success. Body=%s. RequestID=%s", body, request_id)
                return body
            else:
                LOGGER.error("Failure. Body=%s. RequestID=%s", body, request_id)
                raise HTTPException(status_code=response.status, detail=body, headers={"X-Request-ID": request_id})
