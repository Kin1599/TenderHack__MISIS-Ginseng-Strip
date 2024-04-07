import pandas as pd
import re

# df = pd.read_csv('/kaggle/input/tender-hack-dataset/top_10_char_ru.csv', sep=',')
#
# data = []
#
# for x in df['Category_ID']:
#     category_id, category_name, top_10_char = x.split(',')[0], x.split(',')[1], x.split(',')[2:]
#     data.append((category_id, category_name, top_10_char))
#
# df_char = pd.DataFrame(data=data, columns=df.columns)

df_char = pd.read_csv('chars_top_10.csv')
df_char = df_char.drop('Unnamed: 0', axis=1)


def remove_quotes_and_special_chars(text):
    pattern = r'[\'\"!@#$%^&*()_+={}\[\]:;<>.?\/\\|`~—–−-]'
    cleaned_text = re.sub(pattern, '', text)
    return cleaned_text


def get_fields(cat_name):
    s = df_char[df_char['Category_Name'] == cat_name]
    return remove_quotes_and_special_chars(s['top_10_char'].tolist()[0]).split(',  ')


'''
get_fields('КАТЕТЕРЫ ДЛЯ ГЕМОДИАЛИЗА')
'''