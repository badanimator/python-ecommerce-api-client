import API from "../../api/axios.config";

class CartService {
  getUserCart() {
    return API.get("/cart/user/");
  }
  getGuestCart() {
    return API.get("/cart/guest/");
  }

  async addToUserCart(product_id, quantity) {
    return await API.post("/cart/user/", { product_id, quantity });
  }
  
  async addToGuestCart(product_id, quantity) {
    return await API.post("/cart/guest", { product_id, quantity });
  }

  async removeFromUserCart(product_id) {
    return await API.delete("/cart/user/", {
      data: { product_id: Number(product_id) },
    });
  }
  
  async removeFromGuestCart(product_id) {
    return await API.delete("/cart/guest/", {
      data: { product_id: Number(product_id) },
    });
  }

  async incrementUser(product_id) {
    return API.patch("/cart/user/", { product_id, action:'increment' });
  }
  
  async incrementGuest(product_id) {
    return API.patch("/cart/guest/", { product_id, action:'increment' });
  }

  async decrementUser(product_id) {
    return API.patch("/cart/user/", { product_id, action:'decrement' });
  }
  
  async decrementGuest(product_id) {
    return API.patch("/cart/guest/", { product_id, action:'decrement'  });
  }
}

export default new CartService();
