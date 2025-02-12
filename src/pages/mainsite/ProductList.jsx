import { useEffect } from "react";
import toast from "react-hot-toast";
import { useProduct } from "../../context/ProductContext";
import CardSkeleton from "../../components/CardSkeleton";
import Shop from "../../layout/Shop";
import Product from "../../components/Product";

const ProductList = () => {
  const { productData, lastProductRef } = useProduct();

  return (
    <Shop categories={[]} types={[]} title={"Shop"}>
      {
        productData.isSuccess && (
          productData.data.pages[0].meta.total == 0 ? (
            <p className="col-span-full mx-auto text-sm text-gray-400">
              No item found
            </p>
          ) : (
            productData.data.pages.map((page, pageIndex) => page.data.map((item, index)=>{
              const isLastProduct = pageIndex === productData.data.pages.length - 1 && index === page.data.length - 1;
              
              return (
                <div ref={isLastProduct ? lastProductRef : null} key={item.slug}>
                  <Product item={item} />
                </div>
              )
            }
            ))
          ))
      }
      {
        productData.isLoading && (
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
        )
      }
      
      {productData.isFetchingNextPage && (
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
    </Shop>
  )
};

export default ProductList;
