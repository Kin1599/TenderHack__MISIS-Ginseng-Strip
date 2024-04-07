import pandas as pd
import requests
import fake_useragent
import json

def get_response(link):
    headers = {
        "Accept": "*/*",
        "Accept-Language": "ru,en;q=0.9,fr;q=0.8",
        "Connection": "keep-alive",
        "Origin": "https://www.wildberries.ru",
        "Referer": "https://www.wildberries.ru/catalog/elektronika/avtoelektronika",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "User-Agent": fake_useragent.UserAgent().random,
        "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTIyNTIwNjcsInZlcnNpb24iOjIsInVzZXIiOiI0NTg1MjcwIiwic2hhcmRfa2V5IjoiMjkiLCJjbGllbnRfaWQiOiJ3YiIsInNlc3Npb25faWQiOiIzYzcwMTdiOWVjYTA0NTI3ODQwNGQ1ZTk2ODhkYTg2YiIsInVzZXJfcmVnaXN0cmF0aW9uX2R0IjoxNjcwNTA0NTI1LCJ2YWxpZGF0aW9uX2tleSI6IjE2NjExYTIzMTYyZjI3ZDkyMzM3NTI5OThkYWI5OWRjOTljZmE2M2Q2MWQzYmMxZjU2NTRkMGZmNDc4ZmUzOGUiLCJwaG9uZSI6InFURlg1R241SStMUkZLMFFMQ09GV0E9PSJ9.H4PCs1wlHm5kGZTDw-HQ2-3jSHWLKl_7LerjYZD4dUMDKS9XBU2bGI5bLpe4olCihr61Q6fsHb0WQetqMI9pfm-42JZoDYPCe3spyOS-nB44papHMPN640ux152ytXVB0bKzbeveWO_vZuqtNFtzqDRP_TskKzdGdGgkxSzeFg-jVjRJUz7I9nHBGq83O1ykpRZFkdqE_guiiavPH9sn88b9Wbr9XKm6v3vT2Us6K3QSKBnu8q8n6xWPdTrfKNS7y9amji9zyg5_hFSKXMIpJywfkuUH2pPKDjxl9mH1fOdySXoA5qmS_QmgDZPMnwYwLIqvSSJr0gAn6xXB1nRvzA",
    }

    try:
        response = requests.get(url=link, headers=headers)
        return response.json()
    except:
        return []
    
    
    

def readJson():
    # Открываем JSON-файл и загружаем его данные
    path = r"C:\\Dmitry\\Universities\\Hackaton\\TenderHack\\parsers\\wb.json"
    with open(path, 'r', encoding='utf-8') as file:
        data = json.load(file)

    categories = [x['name'] for x in data]
    for dat in data:
        if('childs' in dat):
            for child in dat['childs']:
                categories.append(child['name'])    

    return categories

#Функция записи данных в csv
def csvEntry(test):
        
        dataFrame = pd.DataFrame(test)
        dataFrame.to_excel('output.csv', index=False) 

        print("Успешно перезаписан csv-файл")

def prepare_items(response):
    try:
        products = []
        
        products_raw = response.get('data', {}).get('products', None)

        if products_raw != None and len(products_raw) > 0:
            for product in products_raw:
                products.append({
                    'brand': product.get('brand', None),
                    'name': product.get('name', None),
                })
        
        return products
    except:
        return []

def main():

    categories = readJson()
    print(len(categories))
    products = []
    for index, name in enumerate(categories):
        link = f"https://search.wb.ru/exactmatch/ru/female/v5/search?ab_testing=false&appType=1&curr=rub&dest=-6074208&query={name}&resultset=catalog&sort=popular&spp=30&suppressSpellcheck=false&uclusters=6&uiv=2&uv=rMan4STTJQuoyKpwMWEp4a8BLFuqnqyOodwp1LCbKw6v7CuJJeSmdSbFshIimR2aK-YqmCQ5L0Epyi8BqtStFKO3rSkx-SyrLRwvWwx_reOru7BuqfElFq0KrE-kEymKK4KsXq_hp1eryyjfrCcjzCWirDooN6IJMOOwQ53lMZcswS1LMACwNKyHsCo0ACkSJzSkzB4irF0rbLOCLFcw5y41pnqqvZwmrdAkrqboo_6dpy-er2CrC6b6IYaoTp8lE92rVyz2rw2tyCrHm0yoijCnsKouhqyPJmuh451ctASqTDB2sceiEChrLv-kqTGjKFkimiDWpISkwai2MvokMQ"
        response = get_response(link)
        products.append(prepare_items(response))
        print(f"{index} category")
    
    with open('brand.txt', 'w', encoding='utf-8') as file:
        for product in products:
            if len(product) > 0:
                for name in product:
                    file.write(name['brand'] + "\n")    

if __name__ == "__main__":
    main()