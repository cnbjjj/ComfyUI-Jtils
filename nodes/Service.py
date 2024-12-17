from . import server
from aiohttp import web

@server.PromptServer.instance.routes.get("/Jtils/version")
async def get_version(request):
    return web.json_response({"version": "0.0.1"})