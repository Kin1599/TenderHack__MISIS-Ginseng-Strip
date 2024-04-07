# ! pip install flash-attn --no-build-isolation

import numpy as np
import pandas as pd
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, GPT2LMHeadModel, GPT2Config, AdamW
from torch.utils.data import Dataset, DataLoader
#from tqdm import tqdm

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model_path = "/1"

tokenizer = AutoTokenizer.from_pretrained(model_path)
model_chat = AutoModelForCausalLM.from_pretrained(
    model_path,
    torch_dtype=torch.bfloat16,
 #   device_map="auto",
    trust_remote_code=True,
)

#torch.backends.cuda.enable_mem_efficient_sdp(False)
#torch.backends.cuda.enable_flash_sdp(False)


def generate_description(prompt):
    messages = [{
        "role":"user",
        "content": prompt
    }]

    model_inputs = tokenizer.apply_chat_template(messages, return_tensors="pt").to(device)
    with torch.no_grad():
        generated_ids = model_chat.generate(
            model_inputs,
            max_new_tokens=7500,
            do_sample=True,
            temperature=0.7,
            top_k=50,
            top_p=0.95,
            pad_token_id=tokenizer.eos_token_id
        )

    decoded = tokenizer.batch_decode(generated_ids, skip_special_tokens=True)
    text = decoded[0].split("[/INST]")[1]
    return text


def product_generator(product_name):
    prompt = f'Напиши описание для товара {product_name} на русском языке'
    description = generate_description(prompt)
    return description


def usluga_generator(product_name):
    prompt = f'Напиши описание для товара {product_name} на русском языке'
    description = generate_description(prompt)
    return description


def work_generator(work_name):
    prompt = f'Напиши описание для товара {work_name} на русском языке'
    description = generate_description(prompt)
    return description


'''
product_generator('Звуковая карта Steinberg UR12')
'''
