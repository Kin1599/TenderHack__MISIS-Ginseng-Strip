from typing import Union
import fill_characteristics
from fastapi import FastAPI
import requests
import json


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
    else:
        query = name
        query_json = {"isExact": False,"keyword": query}

        suggestions = requests.get('https://zakupki.mos.ru/newapi/api/SkuSearch/QueryAutocomplete?queryFilter=' + json.dumps(query_json)).json()['items']
        entity_id = suggestions[0]['id']

        data = requests.get(f'https://old.zakupki.mos.ru/api/Cssp/Sku/GetEntity?id={entity_id}&withRecalcRegion=false').json()
        params = dict()
        for char in data['skuCharacteristics']:
            value = ''
            value += str(char['characteristicValueIntValue'])
            value += str(char['characteristicValueStringValue'])
            value += str(char['characteristicValueBoolValue'])
            value += str(char['characteristicValueDecimalValue'])
            params[char['productCharacteristicValue']['productCharacteristicName']] = value.replace('None', '')
        response = []
        for i in params:
            response.append({'id': 0, 'title': i, 'value': params[i], 'unit': ''})
        return response

    return charact