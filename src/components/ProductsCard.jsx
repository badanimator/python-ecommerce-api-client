import { Grid, Columns, Filter, ChevronDown } from "react-feather"
import { useState } from "react";
import { useProduct } from "../context/ProductContext";
import CardSkeleton from "./CardSkeleton";



const ProductsCard = ({children, dataNotFound, isLoading})=>{
  const [grid, setGrid] = useState(4);
  const [sortOpen, setSortOpen] = useState(false);
  const {setOrderby, orderby} = useProduct();

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg w-full bg-white mt-6 px-5 py-4">
      <div className="mb-3">
        <div className="flex justify-between place-items-center text-gray-600 text-sm relative">
          <div className="flex">
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
        {children}
        {isLoading && (
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
        )}
        {dataNotFound && <p className="col-span-full mx-auto text-sm text-gray-400 h-96">No item found</p>}
      </div>
    </div>
  )
}

export default ProductsCard;