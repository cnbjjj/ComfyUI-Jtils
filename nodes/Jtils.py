import logging
import torch
import numpy as np
import hashlib
def version():
    return "𝓙tils 0.0.1"
class Jtils:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {"required":
                    {"image": ("IMAGE",),
                     },
                    "optional":{
                            "image_ref": ("IMAGE_FILE",)
                        },
                }
    CATEGORY = "Jtils"
    RETURN_TYPES = ("IMAGE", "MASK")
    RETURN_NAMES = ("image", "mask")
    FUNCTION = "test"
    OUTPUT_NODE = True

    def test(self, image, image_ref=None):
        logging.info(version())
        return image