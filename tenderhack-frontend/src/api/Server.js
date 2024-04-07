import axios from 'axios'

export default class SendServer{
    static async sendDataToServer(item){
        try{
            const response = await axios.post(
                'http://127.0.0.1:8000/',
                { nameItem: item },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response.data)
            return response.data
        } catch(error) {
            console.error(error)
        }
    }

    static async predictType(item){
        try{
            const response = await axios.get('http://localhost:8008/predict_type', 
            {"text": item},
            { 
            headers: { 
                "access-control-allow-credentials": "true", 
                "access-control-allow-origin": "*" }}
        );
            return response.data;
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }

    static async preprocess(item){
        try {
            const response = await axios.get(
                "http://localhost:8008/preprocess",
                { "text": item },
                {
                headers: {
                    'Content-Type': 'application/json',
                },
            }) 
            console.log(response.data)
            return response.data
        } catch(error) {
            console.error(error)
        }
    }

    static async predictCategory(item){
        try {
            const response = await axios.get(
                "http://localhost:8008/predict_category", 
                { "text": item },
                {
                headers: {
                    'Content-Type': 'application/json',
                },
            }) 
            console.log(response.data)
            return response.data
        } catch(error) {
            console.error(error)
        }
    }

    static async getField(category){
        try {
            const response = await axios.get(
                "http://localhost:8008/get_fields", 
                { category },
                {
                headers: {
                    'Content-Type': 'application/json',
                },
            }) 
            console.log(response.data)
            return response.data
        } catch(error) {
            console.error(error)
        }
    }
}

