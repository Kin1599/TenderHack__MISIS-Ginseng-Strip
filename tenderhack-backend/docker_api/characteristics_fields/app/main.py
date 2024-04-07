from typing import Union
import characteristics_fields
from fastapi import FastAPI
import json

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/get_pred")
def read_item(text: dict):
    response = characteristics_fields.get_fields(text['text'])
    return {"text": response}