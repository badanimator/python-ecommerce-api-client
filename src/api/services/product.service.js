import API from "../../api/axios.config";

class ProductService {
  getCategories(){
    return API.get("/category/user?per_page=1000000000");
  }
  getUserProduct(page, search_str, category_id, order_by) {
    const per_page = 24
    if (category_id) return API.get(`/products/user?per_page=${per_page}&page=${page}&name__sw=${search_str}&category_id=${category_id}&orderby=${order_by}`);
    return API.get(`/products/user?per_page=${per_page}&page=${page}&name__sw=${search_str}&orderby=${order_by}`);
  }
  getProductBySlug(slug) {
    return API.get(`/products/user/${slug}`);
  }
}

export default new ProductService();
