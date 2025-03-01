import API from "../../api/axios.config";

class ImageService {
  async getCarouselImages(){
    return API.get("/image/carousel");
  }
}

export default new ImageService();
