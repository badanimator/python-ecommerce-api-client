import API from "../../api/axios.config";
import QueryString from "qs";

class ProductService {
  getCategories(){
    return API.get("/category/user?per_page=1000000000");
  }
  getUserProduct(pageParam, filters) {
    return API.get(`/products/user?page=${pageParam}`, {
      params:filters,
      paramsSerializer: (params)=> QueryString.stringify(params, {arrayFormat: "repeat"}),
    });
  }
  getProductBySlug(slug) {
    return API.get(`/products/user/${slug}`);
  }
}

export default new ProductService();
