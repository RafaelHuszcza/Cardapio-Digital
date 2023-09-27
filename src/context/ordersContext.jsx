import { createContext, useContext, useState, useCallback } from "react";

const OrdersContext = createContext({});

export const OrdersProvider = ({ children }) => {
  
  const [orders, setAllOrders] = useState([]);
  
  const setOrders = useCallback((orders)=>{
    setAllOrders(orders)
  },[])

  return (
    <OrdersContext.Provider value={{ orders, setOrders}}>
      {children}
    </OrdersContext.Provider>
  );
  }

export const useOrders = () => {
  const context = useContext(OrdersContext);
  return context;
};
