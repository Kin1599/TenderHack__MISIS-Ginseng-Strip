from typing import Union
import fill_characteristics
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/get_pred")
def read_item(text: dict):
    name = text['text']
    charact = dict()
    if name in fill_characteristics.ans_dict_char:
        charact = fill_characteristics.ans_dict_char[name]
        response = []
        for i in charact:
            response.append({'id': 0, 'title': i, 'value': charact[i], 'unit': ''})
        return response
    return charact