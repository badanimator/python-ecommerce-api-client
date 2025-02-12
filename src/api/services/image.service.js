import API from "../../api/axios.config";

class ImageService {
  uploadProductImages(product_id, files) {
    var formData = new FormData();
    formData.append("product_id", product_id)
    formData.append("files", files[0]);
    // console.log(files)
    return API.post("/image/product/create", formData, {
        headers:{'Content-Type': 'multipart/form-data'}
    });
  }
  async getCarouselImages(){
    return API.get("/image/carousel");
  }
  deleteImage(image_id){
    return API.delete(`/image/delete/${image_id}`);
  }
}

export default new ImageService();
