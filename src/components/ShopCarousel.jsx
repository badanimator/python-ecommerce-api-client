import Skeleton from "react-loading-skeleton";
import { Carousel } from "react-responsive-carousel";
import 'react-loading-skeleton/dist/skeleton.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useQuery } from "@tanstack/react-query";
import imageService from "../api/services/image.service";

function ShopCarousel() {
  const images = useQuery({
    refetchOnWindowFocus:false,
    queryKey: ["carousel_images"],
    queryFn: async ()=>{
      try{
        const res = await imageService.getCarouselImages()
        return res.data
      }catch(errors){
        return {items:[]}
      }
    }
  })

  return (
    <>
      {images.isLoading && <Skeleton className="h-24 md:h-64" />}
      {images.isSuccess && (
        <div className="">
          <Carousel
            autoPlay
            infiniteLoop
            showStatus={false}
            // showArrows={true}
            showThumbs={false}
            swipeable={true}
            transitionTime={500}
            interval={4000}
            className="rounded-2xl overflow-hidden shop shadow-lg"
          >
            {
              (images?.data?.items?.length > 0)?
              (images.data.items.map((image)=> (
                <div className="relative" key={image.id}>
                  <img
                    loading="lazy"
                    className=" bg-white h-24 object-cover md:h-64 w-full pointer-events-none"
                    src={image.url}
                  />
                </div>
              )))
              :
              (
                <>
                  <div className="relative">
                    <img
                      loading="lazy"
                      className=" bg-white h-24 object-cover md:h-64 w-full pointer-events-none"
                      src="/banner.jpg"
                    />
                  </div>
                  
                </>
              )
            }
          </Carousel>
        </div>
      )}
    </>
  );
}

export default ShopCarousel;
