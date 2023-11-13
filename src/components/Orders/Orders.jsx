import { useEffect, useState } from "react";
import { OrderCard } from "../OrderCard/OrderCard";

import { useProducts } from '../../context/productsContext';
import { useOrders } from '../../context/ordersContext';
import { useToast } from '../../context/toastContext';
import { useAuth } from '../../context/authContext';

import handleError from '../../helpers/errorHandle';
import api from '../../utils/api';
import styles from './Orders.module.css';

export function Orders() {
  const [productsToShow, setProductsToShow] = useState([]);
  const { products, setProducts} = useProducts();
  const { orders, setOrders} = useOrders();
  const { addToast } = useToast();
  const { data, isLogged } = useAuth();

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
        const requestOrdersURL = `/orders?clientId=${data?.user?.id}&token=${data?.token}`;
        const response = await api.get(requestOrdersURL);
        console.log(response.data.orders)
        // TODO: falta adicionar uma coluna de status pra cada Order. dai nos teremos o controle de qual produto foi entregue, qual foi cancelado, qual esta em andamento, etc.
        setOrders(response.data.orders);
      } catch (err){
        const message = handleError(err);
        addToast({ type: "error", title: 'Carregar dados', message })
      }
    }
    if ((orders.length === 0) && isLogged()) loadOrders();
  }, [orders]);
  // TODO: tirei o filtro temporariamente pra que o codigo funcione. mas precisamos filtrar os produtos que o cliente comprou
  // useEffect(() => {
  //   orders.map( order => {     
  //     products.map(item => {
  //       if (item.id === order.productId && productsToShow.length < orders.length){       
  //         setProductsToShow(arr => [...arr,{...order, name: item.name, url: item.url }])
  //       }
  //     })
  //   })
  // }, [orders]);

  return (    
    <div className={styles.products}>
      {products.map(product => {
        <OrderCard product={product} />
      })}
    </div>
  );
}