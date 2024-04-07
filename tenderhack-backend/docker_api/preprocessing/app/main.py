from typing import Union
import preprocessing
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/get_pred")
def read_item(text: dict):
    response = preprocessing.normalize(text['text'])
    return {"text": response}
