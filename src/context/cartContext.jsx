import { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  
  
  const [cart, setCartItems] = useState([]);

  const setCart = useCallback((items)=>{
    setCartItems(items)
  },[])

  return (
    <CartContext.Provider value={{ cart, setCart}}>
      {children}
    </CartContext.Provider>
  );
  }

export const useCart = () => {
  const context = useContext(CartContext);
  return context;
};
