from typing import Union
from fastapi import FastAPI
import requests

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/preprocess")
def preprocess(text: dict):
    response = requests.get('http://preprocessing_model/get_pred', json=text).json()

    if response["text"] == 'Наименование должно состоять минимум из 3-x слов, длина наименования должна быть более 10 символов':
        response["text"] = 'Too short'
    #{"text": "Toxic text"} Too short или обработанный
    
    return response

@app.get("/predict_type")
def type_prediction(text: dict):
    t_type = requests.get('http://type_prediction_model/get_pred', json=text).json()['text']
    response = {'type': t_type, 'manufacturer': [], 'model': []}
    
    if t_type == 'Товар':
        parsed = requests.get('http://checkname_model/get_pred', json=text).json()['text']
        keys = parsed.keys()
        if 'model' in keys:
            response['model'] += parsed['model']
        if 'manufacturer' in keys:
            response['manufacturer'] += parsed['manufacturer']
    return response

@app.get("/predict_category")
def predict_category(text: dict):
    cats = requests.get('http://category_pred_model/get_pred', json=text).json()['text']
    response = []
    for i in cats:
        if i not in response:
            response.append(i)
    return response

@app.get("/get_fields")
def get_fields(text: dict):
    cats = requests.get('http://characteristics_fields/get_pred', json=text).json()['text']
    response = []
    for i in cats:
        if i not in response:
            response.append(i)
    return cats
