import time
from uuid import uuid1

from aiohttp import ClientSession, ClientResponseError
from authlib.jose import jwt

from constants import CRUD_ADDRESS, CLIENT_ID, CLIENT_KEY, SCOPES
from logger import LOGGER


async def request_auth_token(
    session: ClientSession, client_id: str, client_key: str, scopes: frozenset[str]
) -> tuple[str, str, int]:
    """
    Request an auth token

    returns a 3-tuple of (type, token, lifetime (seconds))
    """
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
    try:
        async with session.post(f"{CRUD_ADDRESS}/oauth/token", data=data) as response:
            body = await response.json()
        return body["token_type"], body["access_token"], body["expires_in"]
    except ClientResponseError as err:
        request_id = None
        if err.headers:
            request_id = err.headers.get("X-Request-ID")
        LOGGER.error(
            "Failed to request access token",
            extra={
                "status": err.status,
                "response": err.message,
                "request_id": request_id,
            },
        )
        raise AssertionError("Failed to request access token") from err


async def make_authorized_request(
    endpoint: str, method: str = "POST", json: dict | None = None
) -> dict:
    async with ClientSession() as session:
        type_, token, _ = await request_auth_token(
            session, CLIENT_ID, CLIENT_KEY, SCOPES
        )
        session.headers["Authorization"] = f"{type_} {token}"
        async with session.request(
            method, f"{CRUD_ADDRESS}/v1/meetings{endpoint}", json=json or {}
        ) as response:
            return await response.json()
