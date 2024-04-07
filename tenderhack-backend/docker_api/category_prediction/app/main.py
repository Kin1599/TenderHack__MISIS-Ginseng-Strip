from typing import Union
import category_prediction
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/get_pred")
def read_item(text: dict):
    response = category_prediction.get_final_result(text['text'])
    return {"text": response}