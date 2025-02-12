import { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";
import productService from "../api/services/product.service";
import { useInfiniteQuery } from "@tanstack/react-query";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [searchStr, setSearchStr] = useState("")
  const [categoryId, setCategoryId] = useState(undefined);
  const [orderby, setOrderby] = useState("")

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
    <ProductContext.Provider value={{ 
      productData,
      categoryId,
      searchStr,
      orderby,
      setCategoryId,
      setSearchStr,
      lastProductRef, 
      setOrderby
      }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

export { ProductContext, ProductProvider, useProduct };
