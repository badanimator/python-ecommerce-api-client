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
  getProductByID(id) {
    return API.get(`/products/admin/${id}/`);
  }
  getProductBySlug(slug) {
    return API.get(`/products/user/${slug}`);
  }
  addProduct(name, quantity, price, category_id, description){
    return API.post('/products/create', {
      name,
      quantity,
      price, 
      category_id:category_id,
      description
    })
  }
  updateProduct(product_id, name, quantity, price, category_id, description, published){
    return API.patch('/products/update', {
      product_id,
      category_id, 
      name,
      price,
      quantity,
      description,
      published
    })
  }
  deleteProduct(product_ids){
    return API.delete('/products/delete', {
      data:{product_ids:product_ids}
    })
  }
}

export default new ProductService();
