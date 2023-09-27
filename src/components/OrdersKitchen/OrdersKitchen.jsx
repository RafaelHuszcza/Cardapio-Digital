
import { useEffect, useState } from "react";
import { OrderCardKitchen } from "../OrderCardKitchen/OrderCardKitchen";


import { useProducts } from '../../context/productsContext';
import { useOrders } from '../../context/ordersContext';
import { useToast } from '../../context/toastContext';

import handleError from '../../helpers/errorHandle';
import api from '../../utils/api';
import styles from './OrdersKitchen.module.css';

export function OrdersKitchen() {
  


const [productsToShow, setProductsToShow] = useState([]);
const { products, setProducts} = useProducts();
const { orders, setOrders} = useOrders();
const { addToast } = useToast();

useEffect(() => {
  async function loadProducts() {
      try {   
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (err){
          const message = handleError(err);
          addToast({ type: "error", title: 'Carregar dados', message })
      }
    }
    if (products.length === 0) loadProducts();
   
  }, [products]);

useEffect(() => {
  async function loadOrders() {
      try {   
        const response = await api.get("/orders");
        setOrders(response.data);

        }  catch (err){
          const message = handleError(err);
          addToast({ type: "error", title: 'Carregar dados', message })
      }
    }

    if (orders.length === 0) loadOrders();    

    }, [orders]);


useEffect(() => {
      orders.map( order => {     
      products.map(item => {
        if (item.id === order.productId && productsToShow.length < orders.length){       
          setProductsToShow(arr => [...arr,{...order, name: item.name, url: item.url }])
        }
      }
      )       
      })
      
    }, [orders]);

  return (    
      
      <div className={styles.products}>
      {productsToShow.map(product => {
      return(   
        <OrderCardKitchen key={product.id} product={product} />
        
      )})}

      </div>


  );
}