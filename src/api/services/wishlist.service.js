import API from "../../api/axios.config";

class WishlistService {
  getUserWishlist() {
    return API.get("/wishlist/user");
  }

  getGuestWishlist() {
    return API.get("/wishlist/guest");
  }

  createUserWishlist(product_id) {
    return API.post("/wishlist/user", {product_id});
  }

  createGuestWishlist(product_id) {
    return API.post("/wishlist/guest", {product_id});
  }

  removeUserWishlistItem(id){
    return API.delete("/wishlist/user", {data:{id}})
  }
  removeGuestWishlistItem(product_id){
    return API.delete("/wishlist/guest", {data:{ product_id }})
  }
}

export default new WishlistService();
