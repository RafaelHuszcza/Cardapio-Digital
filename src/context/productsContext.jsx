import { createContext, useContext, useState, useCallback } from "react";

const ProductsContext = createContext({});

export const ProductsProvider = ({ children }) => {
  
  const [products, setAllProducts] = useState([]);
  
  const setProducts = useCallback((products)=>{
    setAllProducts(products)
  },[])

  return (
    <ProductsContext.Provider value={{ products, setProducts}}>
      {children}
    </ProductsContext.Provider>
  );
  }

export const useProducts = () => {
  const context = useContext(ProductsContext);
  return context;
};
