from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from time import sleep

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешаем запросы от всех источников (*), можно также указать конкретные источники ['http://localhost', 'http://localhost:3000']
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Разрешаем использование указанных методов
    allow_headers=["*"],  # Разрешаем использование всех заголовков
)

def get_by_p(prompt):
    return requests.get('http://ptp.pythonanywhere.com/get_desc').json()[prompt]

def add_new(prompt):
    data = {'prompt':prompt}
    requests.get('http://ptp.pythonanywhere.com/generate_desc', json=data)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/preprocess")
def preprocess(text: dict):
    response = requests.get('http://preprocessing_model/get_pred', json=text).json()

    if response["text"] == 'Наименование должно состоять минимум из 3-x слов, длина наименования должна быть более 10 символов':
        response["text"] = 'Too short'
    #{"text": "Toxic text"} Too short или обработанный
    return response

@app.post("/predict_type")
def type_prediction(text: dict):
    t_type = requests.get('http://type_prediction_model/get_pred', json=text).json()['text']
    response = {'type': t_type, 'manufacturer': [], 'model': []}
    
    if t_type == 'Товар':
        parsed = requests.get('http://checkname_model/get_pred', json=text).json()['text']
        keys = parsed.keys()
        if 'model' in keys:
            response['model'] += parsed['model']
        if 'manufacturer' in keys:
            response['manufacturer'] += list(map(lambda x: x.capitalize(), parsed['manufacturer']))
    return response

@app.post("/predict_category")
def predict_category(text: dict):
    cats = requests.get('http://category_pred_model/get_pred', json=text).json()['text']
    response = []
    for i in cats:
        if i not in response:
            response.append(i)
    return response

@app.post("/get_fields")
def get_fields(text: dict):
    cats = requests.get('http://characteristics_fields/get_pred', json=text).json()['text']
    response = []
    for i in cats:
        if i not in response:
            response.append(i)
    return cats

@app.post("/generate_description")
def generate_description(text: dict):
    p = text['text']
    add_new(p)
    for i in range(20):
        sleep(5)
        a = get_by_p(p)
        if a != '':
            return {'text': a}
    return {'text': a}

@app.post("/get_codes")
def get_codes(text: dict):
    response = requests.get('http://get_codes/get_pred', json=text).json()
    return response