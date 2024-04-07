from typing import Union
import description_generator
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/get_pred")
def read_item(text: dict):
    response = description_generator.product_generator(text['text'])
    return {"text": response}