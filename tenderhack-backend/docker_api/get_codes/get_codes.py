import numpy as np
import pandas as pd

kgpz = pd.read_csv('/kgpz.csv', sep=';')
kgpz = kgpz.applymap(lambda x: x.lower() if isinstance(x, str) else x)

odkp = pd.read_csv('/odkp.csv', sep=';')
odkp = odkp.applymap(lambda x: x.lower() if isinstance(x, str) else x)


def get_codes(cat):
    s_cat = cat.lower()
    codes_okpd = odkp.loc[odkp['Name'] == s_cat]['Kod'].tolist()
    codes_kpgz = kgpz.loc[kgpz['kpgzName'] == s_cat]['kpgzCode'].tolist()

    return codes_okpd, codes_kpgz


'''
get_codes('Ролики массажные')
'''