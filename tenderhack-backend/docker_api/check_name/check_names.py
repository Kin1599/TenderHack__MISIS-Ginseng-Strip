import clickhouse_connect
import re

client = clickhouse_connect.get_client(
    host='x2ar8i584r.europe-west4.gcp.clickhouse.cloud',
    port=8443,
    username='default',
    password='Avk7dO5kAfK_s'
)

query_result = client.query("SELECT Model, Manufacturer FROM tender_hack_table")


def remove_quotes_and_special_chars(text):
    pattern = r'[\'\"!@#$%^&*()_+={}\[\]:;<>,.?\/\\|`~—–−-]'
    cleaned_text = re.sub(pattern, '', text)
    return cleaned_text
#import os
#raise Exception(os.listdir('models/'))
models = []
with open('models/all_models.txt', 'r') as f:
    for line in f:
        models.append(line.strip())

manufacturers = []
with open('../models/all_manufacturers.txt', 'r') as f:
    for line in f:
        manufacturers.append(line.strip())

models_set = set(models)
manufacturers_set = set(manufacturers)


def checker_model_manufacturer(text):
    isManufacturer = False
    isModel = False
    words = [remove_quotes_and_special_chars(x) for x in text.split() if len(x) > 3]
    mdls = []
    mnfc = []
    for word in words:
        if word in manufacturers_set:
            mnfc += [word]
            isManufacturer = True
        elif word in models_set:
            mdls += [word]
            isModel = True
        if isManufacturer and isModel:
            s = text.split()
            if s.index(mnfc[0]) != len(s) - 1:
                r = [s[s.index(mnfc[0]) + 1]]
            else:
                r = [s[s.index(mnfc[0]) - 1]]
            return {'status': 'Указаны модель и производитель, все ок', 'manufacturer': mnfc, 'model': r + mdls}
    if isModel and (not isManufacturer):
        return {'status': 'Возможно вы забыли указать производителя', 'model': mdls}
    elif isManufacturer and (not isModel):
        return {'status': 'Возможно вы забыли указать модель', 'manufacturer': mnfc}
    return {'status': 'Не указаны модель и производитель'}


'''
checker_model_manufacturer('Подставка ИКЕА БЕРГЕНЕС, бамбук')
'''