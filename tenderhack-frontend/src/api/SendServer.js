import axios from 'axios'

export default class SendServer{
    static async sendDataToServer(item){
        try{
            const response = await axios.post(
                `http://127.0.0.1:8000/name?nameItem=${item}`
            );
            console.log(response.data)
            return response.data
        } catch(error) {
            console.error(error)
            throw error;
        }
    }
}
