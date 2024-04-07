import pandas as pd
import clickhouse_connect
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

embedding_model = SentenceTransformer("intfloat/multilingual-e5-small")

client = clickhouse_connect.get_client(
    host='x2ar8i584r.europe-west4.gcp.clickhouse.cloud',
    port=8443,
    username='default',
    password='Avk7dO5kAfK_s'
)

query_result = client.query("SELECT CTE_name, name_embedding FROM tender_hack_table WHERE notEmpty(name_embedding)")

names = []
embeddings = []

for row in query_result.result_rows:
    name, embedding = row
    names.append(name)
    embedding_array = np.array(embedding, dtype=np.float32)
    embeddings.append(embedding_array)


def get_top_k_names(name, top_k):
    name_embedding = embedding_model.encode([name])[0]
    cos_similarities = cosine_similarity(name_embedding.reshape(1, -1), np.array(embeddings))
    sorted_indices = np.argsort(cos_similarities[0])[::-1]

    unique_names = set()
    top_names = []
    top_indices = []
    for idx in sorted_indices:
        if len(top_names) >= top_k:
            break
        name = names[idx]
        if name not in unique_names:
            unique_names.add(name)
            top_names.append(name)
            top_indices.append(idx)

    return top_names


def get_inf_by_name(top_4_names):
    answer = {}
    for name in top_4_names:
        safe_name = name.replace("'", "\\'")
        query_result = client.query(f"SELECT CTE_name, Category_Name, Model, Manufacturer FROM tender_hack_table "
                                    f"WHERE CTE_name = '{safe_name}'")
        for row in query_result.result_rows:
            cte_name, cat_name, model, manuf = row
            answer[cte_name] = [cat_name, model, manuf]
    return answer

def get_final_result(name):
    top_4_names = get_top_k_names(name,top_k=4)
    ans = get_inf_by_name(top_4_names)
    categories = []
    for x in ans.values():
        categories.append(x[0])
    return categories




'''
get_final_result('Описание Наушники True Wireless JBL C115 White (JBLC115TWSWHT)')
'''