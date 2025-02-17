import API from "../axios.config"

class Checkout{
    payment(phone_number, payment_method){
        return API.post("/payment/create", {phone_number, payment_method});
    }
}

export default new Checkout();