import pandas as pd
import clickhouse_connect

findict = pd.read_pickle('final_dictionary_1.pkl')
# key_list = findict.keys()
# client = clickhouse_connect.get_client(
#     host='x2ar8i584r.europe-west4.gcp.clickhouse.cloud',
#     port=8443,
#     username='default',
#     password='Avk7dO5kAfK_s'
# )
# cool_dict ={}
# def split_list(lst, chunk_size):
#     for i in range(0, len(lst), chunk_size):
#         yield lst[i:i + chunk_size]

# key_list = list(key_list)
# key_list_chunks = list(split_list(key_list, 100))

cool_dict = pd.read_pickle('final_dictionary_final.pkl')

def get_char_from_name(name):
    return findict[name]

ans_dict_char ={}
for name in cool_dict.values():
    charc = get_char_from_name(name)
    ans_dict_char[name] = charc