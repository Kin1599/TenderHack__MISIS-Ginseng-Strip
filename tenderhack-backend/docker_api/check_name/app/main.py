from typing import Union
import check_names
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/get_pred")
def read_item(text: dict):
    response = check_names.checker_model_manufacturer(text['text'])
    return {"text": response}