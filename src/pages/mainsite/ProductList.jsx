import { useState, useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useProduct } from "../../context/ProductContext";
import productService from "../../api/services/product.service";
import CardSkeleton from "../../components/CardSkeleton";
import Shop from "../../layout/Shop";
import Product from "../../components/Product";

const ProductList = () => {
  const {searchStr, categoryId, orderby} = useProduct();
  // const [searchStr, setSearchStr] = useState("")
  // const [categoryId, setCategoryId] = useState(undefined);
  // const [orderby, setOrderby] = useState("")

  const productData = useInfiniteQuery({
    refetchOnWindowFocus:false,
    queryKey: ['products', searchStr, categoryId, orderby],
    queryFn: async ({ pageParam = 1 }) => {
      try{
        const res = await productService.getUserProduct(
          pageParam, 
          searchStr, 
          categoryId,
          orderby
        );
        return res.data;
      }catch(error){
        return
      }
    }, 
    getNextPageParam: (lastPage) => {
      return (lastPage.meta.page < lastPage.meta.pages)? lastPage.meta.page + 1:undefined
    }
  })
  
  const observerRef = useRef();
    const lastProductRef = useCallback((node)=>{
      if (productData.isFetchingNextPage) return
      if (observerRef.current) observerRef.current.disconnect();
  
      observerRef.current = new IntersectionObserver((entries)=>{
        if (entries[0].isIntersecting && productData.hasNextPage){
          productData.fetchNextPage()
        }
      })
  
      if (node) observerRef.current.observe(node);
    }, [productData.hasNextPage, productData.fetchNextPage, productData.isFetchingNextPage])


  return (
    <Shop title={"Shop"}>
      {
        productData.isSuccess && (
          productData.data.pages[0].meta.total == 0 ? (
            <p className="col-span-full mx-auto text-sm text-gray-400">
              No item found
            </p>
          ) : (
            productData.data.pages.map((page, pageIndex) => page.items.map((item, index)=>{
              const isLastProduct = pageIndex === productData.data.pages.length - 1 && index === page.items.length - 1;
              
              return (
                <Product key={index} item={item} ref={isLastProduct ? lastProductRef : null} />
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
