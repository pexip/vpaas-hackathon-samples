import os

CRUD_ADDRESS = os.environ.get("CRUD_ADDRESS")
CLIENT_ID = os.environ.get("CLIENT_ID")
CLIENT_KEY = os.environ.get("CLIENT_KEY")

SCOPES = frozenset[str](
    {
        "meeting:read",
        "meeting:create",
        "meeting:write",
        "participant:read",
        "participant:create",
    }
)
