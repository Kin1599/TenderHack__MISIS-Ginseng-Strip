import axios from 'axios';

export default class SendServer {
    static async sendDataToServer(item) {
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/',
                { nameItem: item },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    static async predictType(item) {
        const data = { 'text': item }
        try {
            const response = await axios.post('http://localhost:8008/predict_type',data);
            return response.data;
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }

    static async preprocess(item) {
        const data = { 'text': item }
        try {
            const response = await axios.post("http://localhost:8008/preprocess",data);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    static async predictCategory(item) {
        const data = { 'text': item }
        try {
            const response = await axios.post("http://localhost:8008/predict_category",data);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    static async getField(category) {
        const data = { category }
        try {
            const response = await axios.post("http://localhost:8008/get_fields",data);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}
