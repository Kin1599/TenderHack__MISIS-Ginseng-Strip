import axios from 'axios';

const YOUR_TOKEN = 'y0_AgAAAAA3IlxfAAuUFQAAAAEBJuQ7AAC_pLbq2xNBHKbTX8dadn4u6wMZ_Q';

// Класс для работы с Яндекс.Маркет API
class Yandex {
    // Метод для получения характеристик товаров
    async fetchCharacteristics() {
        try {
            const response = await axios.get('https://api.partner.market.yandex.ru/v2/models/1234567/offers', {
                headers: {
                    'Authorization': `Bearer ${YOUR_TOKEN}`,
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true'
                    // Другие необходимые заголовки
                }
            });

            // Обработка полученного ответа
            console.log(response.data); // Вывод полученных данных в консоль
            // Здесь вы можете выполнить дополнительную обработку данных или передать их в другие части вашего приложения
        } catch (error) {
            console.error('Error fetching characteristics:', error);
            // Обработка ошибок, если они возникли
        }
    }
}

export default Yandex;
