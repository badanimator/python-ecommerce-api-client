import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    per_page: 16,
    category: [], 
    min_price: "", 
    max_price: "", 
    name: ""
  });

  const setSearchStr = (value)=>{
    setFilters({...filters, name:value});
  }
  const setCategory = (value)=>{
    setFilters((prev)=> ({...prev, category: prev.category.includes(value)? prev.category.filter((cat)=> cat!== value):[...prev.category, value]}));
  }
  const setMinPrice = (value)=>{
    setFilters({...filters, min_price: value});
  }
  const setMaxPrice = (value)=>{
    setFilters({...filters, max_price: value});
  }
  const setPerPage = (value)=>{
    setFilters({...filters, per_page: value});
  }


  return (
    <ProductContext.Provider value={{ 
      filters,
      setCategory,
      setSearchStr,
      setMinPrice,
      setMaxPrice,
      setPerPage,
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
