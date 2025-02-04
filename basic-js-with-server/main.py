from typing import Union

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse

from constants import CRUD_ADDRESS
from helpers import make_authorized_request
        
app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def read_root():
    return FileResponse("static/index.html")

@app.post("/api/v1/create")
async def create_meeting():
    return await make_authorized_request("/")

@app.post("/api/v1/meetings/{meeting_id}/participants")
async def add_participant(meeting_id: str, q: Union[str, None] = None):
    response_data = await make_authorized_request(f"/{meeting_id}/participants")
    response_data["api_address"] = CRUD_ADDRESS
    return response_data
