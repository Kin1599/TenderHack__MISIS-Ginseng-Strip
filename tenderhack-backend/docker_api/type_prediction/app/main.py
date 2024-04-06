from typing import Union
import type_prediction
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/get_pred")
def read_item(text: dict):
    response = type_prediction.pred(text['text'])
    return {"text": response}