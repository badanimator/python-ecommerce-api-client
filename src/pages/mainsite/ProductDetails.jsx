import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "react-feather";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag, Heart } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";

import productService from "../../api/services/product.service";
import Spinner from "../../components/Spinner";
import Page from "../../layout/Page";
import Product from "../../components/Product";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState(0);
  const { isInCart, addItem, cartData } = useCart();
  const { addWishlistItem, isInWishlist, wishlistData } = useWishlist()

  // fetch data
  const {data: dataItem, isLoading, isSuccess} = useQuery({
    refetchOnWindowFocus:false,
    queryKey:['product_details', slug],
    queryFn: async ()=> {
      try{
        const { data } = await productService.getProductBySlug(slug);
        return data
      }catch(error){
        return navigate("/404", {replace: true,});
      }
    }
  })

  
  const { control, handleSubmit } = useForm();

  const onSubmit = async (variation) => {
    try{
      const res = await addItem(dataItem.id, 1, {...variation});
      return res.data;
    }catch(errors){
      toast.error("Error adding to cart");
    }finally{
      cartData.refetch();
    }
  };

  
  const isActiveThumbnail = (currentThumbnailKey, thumbnailKey)=>{
    return currentThumbnailKey===thumbnailKey
  }

  if (isLoading) {
    return <Spinner size={100} loading />;
  }
  else if(isSuccess){
    return (
      <Page>
        <div className="flex justify-between place-items-center py-4 px-1 mb-4">
            <Link to="/">
              <div className="w-9 h-9 shadow-lg bg-white text-black hover:bg-black hover:text-white duration-200 cursor-pointer rounded-full flex justify-center place-items-center">
                <ChevronLeft className="w-4 h-4 " />
              </div>
            </Link>
            <h4 className="text-cusblack text-md">Product Details</h4>
            <div className="w-8"></div>
          </div>

          <div className="w-full bg-white md:rounded-2xl shadow-lg md:py-8 md:px-10 md:flex overflow-hidden">
            <div className="photo md:w-1/3">
              <div>
                <img
                  className=" h-60 object-contain w-full md:rounded-2xl"
                  src={dataItem?.images[thumbnail].url}
                  alt=""
                />
              </div>
              <div className="px-2 md:px-0 flex mt-4 overflow-y">
                {
                  dataItem.images.map((image, key)=> (
                    <img
                      key={key}
                      className={
                        isActiveThumbnail(thumbnail, key)? 
                          "overflow-hidden border-2 border-black filter brightness-90 md:w-14 md:h-14 h-16 w-16 rounded-xl object-cover mr-3 cursor-pointer duration-100 "
                          :
                          "overflow-hidden border-2 filter brightness-90 md:w-14 md:h-14 h-16 w-16 rounded-xl object-cover mr-3 cursor-pointer duration-100 " 
                        }
                      decoding="async"
                      loading="lazy"
                      src={image.url}
                      alt={dataItem.name}
                      style={{height: 60}}
                      onClick={()=> setThumbnail(key)}
                    />
                ))}
              </div>
            </div>
            <div className="detail px-2 md:px-0 mt-3 md:mt-0 md:ml-6 py-2 md:w-2/3">
              <p className="flex place-items-center text-sm text-gray-400">
                {dataItem.category.name}
              </p>
              <h1 className="text-3xl text-cusblack font-medium my-3">
                {dataItem.name}
              </h1>
              <p className="text-sm text-gray-400 pb-6">{dataItem.description}</p>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* <div className="sizes text-sm text-gray-400">
                  <p className="mb-2">Select size</p>
                  <div className="flex">
                    {dataItem.variations.map((variation) => 
                      variation.options.map((option, key)=>(
                        <Controller
                          key={key}
                          name={variation.sku}
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              defaultChecked={variation.options[0].value === option.value}
                              required
                              control={control}
                              className="border border-black mr-2 duration-200 flex place-items-center justify-center rounded-full w-12 h-12 cursor-pointer hover:bg-black hover:text-white"
                              type="radio" 
                              value={option.value}
                              id={variation.id}
                            />
                          )}
                        />
                      ))
                    )}
                  </div>
                </div> */}
                <div className="buttoncart flex mt-5 w-full">
                  <button type="submit"
                    disabled={isInCart(dataItem.id)}
                    className={`w-4/5 md:w-3/5 ${isInCart(dataItem.id)?"bg-gray-500":"bg-black"} overflow-hidden py-4 text-white rounded-lg text-sm active:bg-gray-800 duration-100`}
                  >
                    <motion.span
                      initial={{ y: -100 }}
                      animate={{ y: 0 }}
                      className="flex justify-center place-items-center overflow-hidden"
                    >
                      {
                        isInCart(dataItem.id)?(
                          <>
                            Added to basket
                            <span>
                              <ShoppingBag className="ml-2 w-5 h-5" fill="white" color="black" />
                            </span>
                          </>
                        ):
                        (
                          <>
                            Add to basket
                            <span>
                              <ShoppingBag className="ml-2 w-5 h-5" />
                            </span>
                          </>
                        )
                      }

                    </motion.span>
                  </button>

                  <button 
                    disabled={isInWishlist(dataItem.id)}
                    onClick={()=>{
                      addWishlistItem(dataItem.id).finally(()=> wishlistData.refetch());
                    }}
                    type="button"
                    className="w-1/5 ml-2 bg-white border border-cusblack py-4 text-cusblack rounded-lg text-sm"
                  >
                    {
                      isInWishlist(dataItem.id)? (
                        <Heart className="w-5 h-5 m-auto" fill={"black"}/>
                      ):
                      (
                        <Heart className="w-5 h-5 m-auto"/>
                      )
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* related products */}
          <div className="text-black p-2 md:px-10 md:py-6 mt-14 bg-white md:rounded-2xl shadow-lg">
            <p className="mb-4 font-medium text-lg">You may also like:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-6">
              {
                dataItem.related_products.map((item, key) => (
                  <Product key={key} item={item} />
              ))}
            </div>
          </div>
      </Page>
    );
  }

};

export default ProductDetails;
