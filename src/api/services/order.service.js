import API from "../../api/axios.config";

class OrderService {
  createOrder(email, phone_number, payment_method) {
    return API.post("/payment/create", {
      email,
      phone_number,
      payment_method,
    });
  }
  getAllOrders(page) {
    return API.get(`/orders/user?page=${page}`);
  }
  getOrder(id) {
    return API.get(`/orders/${id}`);
  }
}

export default new OrderService();
