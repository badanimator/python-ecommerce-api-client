import API from "../../api/axios.config";

class OrderService {
  guestCheckout(phone_number, payment_channel, email, address_line1, address_line2, city, region){
    return API.post("/checkout/guest", {phone_number, payment_channel, email, address_line1, address_line2, city, region});
  }

  userCheckout(phone_number, payment_channel, email, address_line1, address_line2, city, region){
    return API.post("/checkout/user", {phone_number, payment_channel, email, address_line1, address_line2, city, region});
  }
}

export default new OrderService();
