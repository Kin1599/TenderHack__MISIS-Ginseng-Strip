from typing import Union
import get_codes
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/get_pred")
def read_item(text: dict):
    a, b = get_codes.get_codes(text['text'])
    return {"codes_okpd": a, "codes_kpgz": b}