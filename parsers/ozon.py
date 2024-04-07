import requests

# Замените значения переменных на ваши собственные ключи API
CLIENT_ID = '1907703'
API_KEY = '6bafab27-8d64-4f30-ae2b-d03756129500'

def fetch_product_info(product_id):
    url = f'https://api.ozon.ru/composer-api.bx/page/json/v1?url=/product-detail/{product_id}&clientId={CLIENT_ID}'
    headers = {'Api-Key': API_KEY}

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        # Парсинг информации о товаре
        product_info = {
            'title': data['result']['product']['title'],
            'description': data['result']['product']['description'],
            # Другие характеристики товара могут быть извлечены аналогичным образом
        }
        return product_info
    else:
        print(f"Failed to fetch product info for product ID: {product_id}")
        return None

if __name__ == "__main__":
    # Пример использования
    product_id = 'your_product_id'
    product_info = fetch_product_info(1420236872)
    if product_info:
        print("Product Title:", product_info['title'])
        print("Product Description:", product_info['description'])
        # Вывод других характеристик товара
