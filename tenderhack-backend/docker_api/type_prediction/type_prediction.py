import numpy as np
import pandas as pd
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, GPT2LMHeadModel, GPT2Config, AdamW
from torch.utils.data import Dataset, DataLoader
from catboost import CatBoostClassifier, Pool
from transformers import RobertaTokenizer, RobertaModel

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased', num_labels=3)
# model = DistilBertModel.from_pretrained('distilbert-base-uncased', num_labels=3)

tokenizer = RobertaTokenizer.from_pretrained('roberta-base', num_labels=3)
model = RobertaModel.from_pretrained('roberta-base', num_labels=3)

model.to(device)

model_1 = CatBoostClassifier()
model_1.load_model("../type_prediction_models/model_1")

model_2 = CatBoostClassifier()
model_2.load_model("../type_prediction_models/model_2")


def get_name_embedding(name, model, tokenizer):
    inputs = tokenizer(name, return_tensors='pt', padding=True, truncation=True).to(device)
    with torch.no_grad():
        outputs = model(**inputs)
    return torch.mean(outputs.last_hidden_state[:, 1:, :], dim=1).cpu().numpy()


def pred(name):
    to_pred = pd.DataFrame({
        'Название': [name]
    })

    to_pred['embedding'] = to_pred['Название'].apply(lambda x: get_name_embedding(x, model, tokenizer))
    X = np.vstack(to_pred['embedding'].values)

    y_pred = model_1.predict(X)
    if y_pred == [1]:
        return 'Товар'

    y_pred_2 = model_2.predict(X)
    if y_pred_2 == [1]:
        return 'Услуга'
    return 'Работа'