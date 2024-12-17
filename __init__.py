import logging
import server
import os
import asyncio
from aiohttp import web

WEB_DIRECTORY = "./web/comfyui"

logging.info(f"++Loading: ComfyUI_Jtils")
NODE_CLASS_MAPPINGS = {}
NODE_DISPLAY_NAME_MAPPINGS = {}
try:
    from .nodes.Jtils import Jtils
    NODE_CLASS_MAPPINGS['Jtils']=Jtils
    NODE_DISPLAY_NAME_MAPPINGS['Jtils']="Jtils"
    @server.PromptServer.instance.routes.get("/Jtils/version")
    async def get_version(request):
        return web.json_response({"version": "0.0.1"})
except Exception as e:
    logging.info('++Loading: ComfyUI_Jtils Error',e)