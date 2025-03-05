import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "react-feather";
import { data, Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag, Heart } from "react-feather";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { SyncLoader } from "react-spinners";
import { PhotoSlider } from "react-photo-view";

import productService from "../../api/services/product.service";
import Product from "../../components/Product";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import CardSkeleton from "../../components/CardSkeleton";
import MainLayout from "../../layout/MainLayout";
import Nav from "../../components/Nav";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const { isInCart, addItem, cartData } = useCart();
  const { addWishlistItem, isInWishlist, wishlistData } = useWishlist();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

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

  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (form_data) => {
    const {variation} =  form_data;
    setIsAddingToCart(true);

    try{
      const res = await addItem(dataItem.id, 1, variation);
      return res.data;
    }catch(errors){
      toast.error("Error adding to cart");
    }finally{
      cartData.refetch();
      setIsAddingToCart(false);
    }
  };

  const handleAddToWishlist = ()=>{
    setIsAddingToWishlist(true);
    addWishlistItem(dataItem.id).finally(()=> {
      wishlistData.refetch();
      setIsAddingToWishlist(false);
    });
  }

  
  const isActiveThumbnail = (currentThumbnailKey, thumbnailKey)=>{
    return currentThumbnailKey===thumbnailKey
  }


  const images = [""]
  return (
    <MainLayout>
      <title>Details - Pelotex</title>
      <Nav />
      <div className="max-w-6xl mx-auto pt-20 px-5 min-h-screen">
        {/* <div className="flex justify-between place-items-center py-4 px-1 mb-4">
          <Link to="/">
            <div className="w-9 h-9 shadow-lg bg-white text-black hover:bg-black hover:text-white duration-200 cursor-pointer rounded-full flex justify-center place-items-center">
              <ChevronLeft className="w-4 h-4 " />
            </div>
          </Link>
          <h4 className="text-black text-md">Product Details</h4>
          <div className=""></div>
        </div> */}

        {isLoading && (<>
          <div className="w-full bg-white md:rounded-2xl shadow-lg md:py-8 md:px-10 md:flex overflow-hidden">
            <Skeleton className="h-56 mb-2" />
          </div>

          <div className="text-black p-2 md:px-10 md:py-6 mt-14 bg-white md:rounded-2xl shadow-lg">
            <p className="mb-4 font-medium text-lg">You may also like:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-6">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          </div>
        </>)}


        {isSuccess && (<>
          <div className="w-full bg-white md:rounded-2xl shadow-lg md:py-8 md:px-10 md:flex overflow-hidden">
            {/* thumbnail */}
            <div className="md:w-1/3">
              <div className="cursor-pointer" onClick={() => setVisible(true)}>
                <img
                  className="h-60 object-contain w-full md:rounded-2xl border p-2 line-clamp-1"
                  src={dataItem.images[index].url}
                  alt={dataItem.images[index].url}
                />
              </div>
              
              {/* image slider */}
              <PhotoSlider
                images={dataItem.images.map((image, key) => ({ src: image.url, key: key }))}
                visible={visible}
                onClose={() => setVisible(false)}
                index={index}
                onIndexChange={setIndex}
              />

              <div className="px-2 md:px-0 flex mt-4 overflow-y">
                {
                  dataItem.images.map((image, key)=> (
                    <img
                      key={key}
                      className={
                        isActiveThumbnail(index, key)? 
                          "overflow-hidden border-2 border-black filter brightness-90 md:w-14 md:h-14 h-16 w-16 rounded-xl object-cover mr-3 cursor-pointer duration-100 "
                          :
                          "overflow-hidden border-2 filter brightness-90 md:w-14 md:h-14 h-16 w-16 rounded-xl object-cover mr-3 cursor-pointer duration-100 " 
                        }
                      decoding="async"
                      loading="lazy"
                      src={image.url}
                      alt={dataItem.name}
                      style={{height: 60}}
                      onClick={()=> setIndex(key)}
                    />
                ))}
              </div>
            </div>
            <div className="px-2 md:px-0 mt-3 md:mt-0 md:ml-6 py-2 md:w-2/3">
              <p className="flex place-items-center text-sm text-gray-400">
                {dataItem.category.name}
              </p>
              <p className="flex place-items-center text-sm text-gray-400">{ dataItem.category.path }</p>
              <h1 className="text-3xl text-cusblack font-medium my-3">
                {dataItem.name}
              </h1>
              <p className="my-3 font-semibold text-lg text-black">{dataItem.formatted_price}</p>
              <p className="text-sm text-gray-400 pb-6">{dataItem.description}</p>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                {(dataItem.variations.length > 0) && (
                  <div className="sizes text-sm text-black-400">
                    <p className="mb-2">Choose Variation</p>
                    <select 
                      className="my-2 border rounded-sm border-gray-300 bg-white px-4 py-3 text-sm"
                      defaultValue={dataItem.variations[0].id}
                      name="variation" 
                      {...register("variation", {required:"Variation is required"})}
                    >
                      {dataItem.variations.map((variation, key) => (
                        <option 
                          key={key}
                          value={variation.id}  
                        >
                          {variation.name + " - GHS" + variation.price}
                        </option>
                    ))}
                    </select>
                    {errors?.variation && (
                      <p className="mt-1 italic text-red-500">
                        {errors.variation.message}
                      </p>
                    )}
                  </div>
                )}
                <div className="buttoncart flex mt-5 w-full">
                  <button type="submit"
                    disabled={isInCart(dataItem.id) || isAddingToCart}
                    className={`w-4/5 md:w-3/5 ${isInCart(dataItem.id)?"bg-gray-500":"bg-black"} overflow-hidden py-4 text-white rounded-lg text-sm active:bg-gray-800 duration-100`}
                  >
                    <motion.span
                      initial={{ y: -100 }}
                      animate={{ y: 0 }}
                      className="flex justify-center place-items-center overflow-hidden"
                    >
                      {
                        isAddingToCart || isLoading?(
                          <span>
                            <SyncLoader size={10} color="white" />
                          </span>
                        ):
                        isInCart(dataItem.id)?(
                          <>
                            Added to basket
                            <span>
                              <ShoppingBag className="ml-2 w-5 h-5" />
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
                    disabled={isInWishlist(dataItem.id) || isAddingToWishlist}
                    onClick={handleAddToWishlist}
                    type="button"
                    className="w-1/5 ml-2 bg-white border border-cusblack py-4 text-cusblack rounded-lg text-sm"
                  >
                    {
                      isAddingToWishlist || isLoading ? (
                        <SyncLoader size={8} />
                      ): isInWishlist(dataItem.id)? (
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
          
          {(dataItem.related_products.length > 0) && (
            <div className="text-black p-2 md:px-10 md:py-6 mt-14 bg-white md:rounded-2xl shadow-lg">
              <p className="mb-4 font-medium text-lg">You may also like:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-6">
                {
                  dataItem.related_products.map((item, key) => (
                    <Product key={key} item={item} />
                ))}
              </div>
            </div>
          )}
        </>)}
      </div>

    </MainLayout>
  )
};

export default ProductDetails;
