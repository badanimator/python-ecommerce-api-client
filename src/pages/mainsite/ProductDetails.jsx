import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "react-feather";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import productService from "../../api/services/product.service";
import AddToCartBtn from "../../components/AddToCartBtn";
import Spinner from "../../components/Spinner";
import Page from "../../layout/Page";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState(0);


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
              <div className="px-2 md:px-0 flex mt-4">
                {
                  dataItem.images.map((image, key)=> (
                    <img
                      key={key}
                      className={
                        isActiveThumbnail(thumbnail, key)? 
                          "border-2 border-black filter brightness-90 md:w-14 md:h-14 h-16 w-16 rounded-xl object-cover mr-3 cursor-pointer duration-100 "
                          :
                          "border-2 filter brightness-90 md:w-14 md:h-14 h-16 w-16 rounded-xl object-cover mr-3 cursor-pointer duration-100 " 
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
                {/* {dataItem.type.name} */}
                <span className="mx-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                {dataItem.category.name}
              </p>
              <h1 className="text-3xl text-cusblack font-medium my-3">
                {dataItem.name}
              </h1>
              <p className="text-sm text-gray-400">{dataItem.description}</p>
              <div className="sizes text-sm text-gray-400">
                <p className="mb-2">Select size</p>
                <div className="flex">
                  {/* {dataItem.prop[0].size.map((size, idx) => (
                    <button
                      onClick={() => setSelectedSize(idx)}
                      key={idx}
                      className={`${
                        selectedSize === idx
                          ? `bg-cusblack text-white`
                          : `text-cusblack border border-cusblack`
                      } mr-2 duration-200 flex place-items-center justify-center rounded-full w-12 h-12 cursor-pointer hover:bg-cusblack hover:text-white`}
                    >
                      {size}
                    </button>
                  ))} */}
                </div>
              </div>
              <div className="buttoncart flex mt-5 w-full">
                <button
                  onClick={() => {
                    dispatch(
                      addToBasket({
                        ...dataItem,
                        selectedSizeProp: dataItem.prop[0].size[selectedSize],
                      })
                    );
                  }}
                  className="w-4/5 md:w-3/5 bg-black overflow-hidden py-4 text-white rounded-lg text-sm active:bg-gray-800 duration-100"
                >
                  <motion.span
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    className="flex justify-center place-items-center overflow-hidden"
                  >
                    Add to basket
                    <span>
                      <svg
                        className="ml-2 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                    </span>
                  </motion.span>
                </button>
                <button
                  // onClick={() => dispatch(addToWishlist(item))}
                  className="w-1/5 ml-2 bg-white border border-cusblack py-4 text-cusblack rounded-lg text-sm"
                >
                  <svg
                    className="w-5 h-5 m-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="text-cusblack p-2 md:px-10 md:py-6 mt-14 bg-white md:rounded-2xl shadow-lg">
            <p className="mb-4 font-medium text-lg">You may also like:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-6">
              {/* {dataAlso
                .filter((it, idx) => it.name != dataItem.name)
                .map((data, idx) => {
                  if (idx < 4)
                    return <ProductCard key={data.slug} item={data} />;
                })} */}
            </div>
          </div>
      </Page>
    );
  }

};

export default ProductDetails;

        // <section className="body-font overflow-hidden">
        //   <div className="container px-5 py-24 mx-auto">
        //     <div className="flex flex-wrap -mx-4">
        //       <div className="w-full md:w-1/2 px-4 mb-2">
        //         <img
        //           decoding="async"
        //           loading="lazy"
        //           alt={product.name}
        //           src={product?.images[thumbnail].url}
        //           className="w-full mb-4 object-contain"
        //           style={{height: 380}}
        //         />
        //         <ul className="gap-4 grid grid-cols-4 mt-3">
        //           {
        //             product.images.map((image, key)=> (
        //               <li 
        //                 className={
        //                   isActiveThumbnail(thumbnail, key)? 
        //                     "overflow-hidden shadow rounded-md p-1 outline-1 outline-purple-500 outline-dashed"
        //                     :
        //                     "overflow-hidden shadow rounded-md p-1" 
        //                   } key={key} 
        //                   onClick={()=> setThumbnail(key)}>
        //                 <img
        //                   className="w-full cursor-pointer object-contain"
        //                   decoding="async"
        //                   loading="lazy"
        //                   src={image.url}
        //                   alt={product.name}
        //                   style={{height: 60}}
        //                 />
        //               </li>
        //             ))
        //           }
        //         </ul>
        //       </div>

        //       <div className="w-full md:w-1/2 px-4">
        //         <h1 className="text-3xl title-font font-medium mb-1">{product?.name}</h1>
        //         <div className="flex mb-4">
        //           <span className="flex items-center">
        //             <ReactStars
        //               count={5}
        //               size={24}
        //               edit={false}
        //               // value={+product?.avg_rating}
        //               activeColor="#ffd700"
        //             />
        //             <span className="ml-3">
        //               {+product?.count > 0 ? `${+product.count} Ratings` : "No ratings available"}
        //             </span>
        //           </span>
        //         </div>
        //         <p className="leading-relaxed pb-6 border-b-2 border-gray-800">
        //           {product?.description}
        //         </p>
        //         <div className="flex mt-4 justify-between">
        //           <span className="title-font font-medium text-2xl">
        //             {product?.price}
        //           </span>
        //           <AddToCartBtn product_id={product.product_id} />
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </section>