import API from "../../api/axios.config";
import axios from "axios";

class OrderService {
  guestCheckout(phone_number, payment_channel, email, address, city, region){
    return API.post("/checkout/guest", {
      phone_number, 
      payment_channel, 
      email, 
      address, 
      city, 
      region
    });
  }

  userCheckout(phone_number, payment_channel, email, address, city, region){
    return API.post("/checkout/user", {phone_number, payment_channel, email, address, city, region});
  }
}

export default new OrderService();
