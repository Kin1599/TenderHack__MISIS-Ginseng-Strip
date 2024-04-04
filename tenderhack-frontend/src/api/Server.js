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
}
