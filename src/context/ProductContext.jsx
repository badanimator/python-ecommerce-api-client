import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [searchStr, setSearchStr] = useState("")
  const [categoryId, setCategoryId] = useState(undefined);
  const [orderby, setOrderby] = useState("")

  return (
    <ProductContext.Provider value={{ 
      categoryId,
      searchStr,
      orderby,
      setCategoryId,
      setSearchStr,
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
