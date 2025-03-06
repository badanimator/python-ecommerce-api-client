import { Grid, Columns } from "react-feather"
import { useState } from "react";
import CardSkeleton from "./CardSkeleton";
import { SyncLoader } from "react-spinners";
import { useProduct } from "../context/ProductContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import productService from "../api/services/product.service";
import Product from "./Product";


const ProductsCard = ()=>{
  const [grid, setGrid] = useState(4);
  const {filters} = useProduct();

  const productData = useInfiniteQuery({
    refetchOnWindowFocus:false,
    queryKey: ['products', filters],
    getNextPageParam: ({ meta }) => (meta?.pages === meta?.page)? undefined: meta.next_num,
    queryFn: async ({pageParam = 1}) => {
      const res = await productService.getUserProduct(pageParam, {...filters});
      return res.data;
    },
  })

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg w-full bg-white mt-6 px-5 py-4">
      <div className="mb-3">
        <div className="flex justify-between place-items-center text-gray-600 text-sm relative">
          <div className="hidden md:flex">
            <button
              onClick={() => setGrid(4)}
              className={
                (grid===4)?
                "p-1 relative flex justify-center items-center rounded-full bg-gray-200"
                :
                "p-1 relative flex justify-center items-center rounded-full hover:bg-gray-100 active:bg-gray-200 cursor-pointer duration-200"
              }
            >
              <Grid className="w-5 h-5" size={15} />
            </button>
            <button
              onClick={() => setGrid(2)}
              className={
                (grid===2)?
                "p-1 relative flex justify-center items-center rounded-full bg-gray-200"
                :
                "p-1 relative flex justify-center items-center rounded-full hover:bg-gray-100 active:bg-gray-200 cursor-pointer duration-200"
              }
            >
              <Columns className="w-5 h-5" size={15} />
            </button>
          </div>
        </div>
      </div>
      <div className={`grid grid-cols-2 md:grid-cols-${grid} lg:grid-cols-${grid} gap-x-4 gap-y-6`}>
        {productData.isLoading? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ): productData.data === undefined || productData.data.pages[0].meta.total === 0? (
          <div className="col-span-full opacity-20">
            <div className="flex flex-col justify-center item-center gap-4">
              <img className="h-44" src="empty.svg" />
              <p className="text-2xl text-center font-medium">No result found</p>
            </div>
          </div>
        ):(
          productData.data.pages.map((page)=>page.items.map((item, index) => <Product key={index} item={item}/>))
        )}

        {/* pagination */}
        {productData.hasNextPage && (
          <button 
            onClick={productData.fetchNextPage}
            disabled={productData.isLoading}
            className="col-span-full rounded-lg border border-gray-500 bg-white text-gray-500 hover:text-black hover:border-black h-10 " type="button"
          >
            {productData.isLoading? <SyncLoader size={10} />: "See more"}  
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductsCard;