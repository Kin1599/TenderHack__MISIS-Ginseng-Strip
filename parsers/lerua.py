import pandas as pd
import requests
import fake_useragent
import json
from bs4 import BeautifulSoup

def get_response(link):
    headers = {
        "Accept": "*/*",
        "Accept-Language": "ru,en;q=0.9,fr;q=0.8",
        "Connection": "keep-alive",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "User-Agent": fake_useragent.UserAgent().random,
        "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTIyNTIwNjcsInZlcnNpb24iOjIsInVzZXIiOiI0NTg1MjcwIiwic2hhcmRfa2V5IjoiMjkiLCJjbGllbnRfaWQiOiJ3YiIsInNlc3Npb25faWQiOiIzYzcwMTdiOWVjYTA0NTI3ODQwNGQ1ZTk2ODhkYTg2YiIsInVzZXJfcmVnaXN0cmF0aW9uX2R0IjoxNjcwNTA0NTI1LCJ2YWxpZGF0aW9uX2tleSI6IjE2NjExYTIzMTYyZjI3ZDkyMzM3NTI5OThkYWI5OWRjOTljZmE2M2Q2MWQzYmMxZjU2NTRkMGZmNDc4ZmUzOGUiLCJwaG9uZSI6InFURlg1R241SStMUkZLMFFMQ09GV0E9PSJ9.H4PCs1wlHm5kGZTDw-HQ2-3jSHWLKl_7LerjYZD4dUMDKS9XBU2bGI5bLpe4olCihr61Q6fsHb0WQetqMI9pfm-42JZoDYPCe3spyOS-nB44papHMPN640ux152ytXVB0bKzbeveWO_vZuqtNFtzqDRP_TskKzdGdGgkxSzeFg-jVjRJUz7I9nHBGq83O1ykpRZFkdqE_guiiavPH9sn88b9Wbr9XKm6v3vT2Us6K3QSKBnu8q8n6xWPdTrfKNS7y9amji9zyg5_hFSKXMIpJywfkuUH2pPKDjxl9mH1fOdySXoA5qmS_QmgDZPMnwYwLIqvSSJr0gAn6xXB1nRvzA",
    }

    try:
        response = requests.get(url=link, headers=headers)
        return response
    except:
        return []

def readJson():
    url = []
    # Открываем JSON-файл и загружаем его данные
    path = r"C:\\Dmitry\\Universities\\Hackaton\\TenderHack\\parsers\\test.json"
    with open(path, 'r', encoding='utf-8') as file:
        data = json.load(file)

    for title in data['category']:
        if 'title' in title:
            url.append(title['title']['url'])

    return url

def getNames(link):
    response = get_response("https://www.lamoda.ru" + link)
    soup = BeautifulSoup(response.text, 'lxml')
    items = soup.find_all('div', class_ = 'x-product-card-description__brand-name')
    
    return [item.text.strip() for item in items]

def main():
    urls = readJson()
    brands = []
    for url in urls:
        brands.append(getNames(url))

    with open('lerua.txt', 'w', encoding='utf-8') as file:
        for brand in brands:
            if len(brand) > 0:
                for b in brand:
                    file.write(b + "\n")

if __name__ == "__main__":
    main()