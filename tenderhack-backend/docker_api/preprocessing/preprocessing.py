import numpy as np
import pandas as pd
import torch
from transformers import AutoModelForSeq2SeqLM, T5TokenizerFast
from toxicityclassifier import *

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

classifier = ToxicityClassificatorV1()
classifier.download_nlkt()

MODEL_NAME = 'UrukHan/t5-russian-spell'
MAX_INPUT = 256

tokenizer = T5TokenizerFast.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME).to(device)


def normal_length(text):
    if len(text) <= 10 or len(text.split()) < 3:
        return False
    return True


def normalize(text):
    if not normal_length(text):
        return 'Наименование должно состоять минимум из 3-x слов, длина наименования должна быть более 10 символов'
    is_toxic = classifier.predict(text)[0]
    if is_toxic:
        return 'Toxic text'
    task_prefix = "Spell correct: "
    if type(text) != list: text = [text]
    encoded = tokenizer(
      [task_prefix + sequence for sequence in text],
      padding="longest",
      max_length=MAX_INPUT,
      truncation=True,
      return_tensors="pt",
    )
    predicts = model.generate(**encoded.to(device))
    return tokenizer.batch_decode(predicts, skip_special_tokens=True)


'''
normalized_text = normalize('Звукавая картв Steinberg UR12')
normalized_text
'''