
import { useEffect, useState } from "react";
import { OrderCard } from "../OrderCard";


import { useProducts } from '../../context/productsContext';
import { useOrders } from '../../context/ordersContext';
import { useToast } from '../../context/toastContext';

import handleError from '../../helpers/errorHandle';
import api from '../../utils/api';
import styles from './styles.module.css';
import { useAuth } from "../../context/authContext";

export function Orders() {


  const [productsToShow, setProductsToShow] = useState([]);
  const { products, setProducts } = useProducts();
  const { orders, setOrders } = useOrders();
  const { addToast } = useToast();
  const { data } = useAuth();

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (err) {
        const message = handleError(err);
        addToast({ type: "error", title: 'Carregar dados', message })
      }
    }
    if (products.length === 0) loadProducts();

  }, [products]);

  const groupProductsByOrder = (data) => {


    const groupedOrders = {};
    if (!data) return [];
    data.forEach((product) => {
      if (!groupedOrders[product.order_id]) {
        groupedOrders[product.order_id] = {
          order_id: product.order_id,
          products: [],
        };
      }
      groupedOrders[product.order_id].products.push(product);
    });
    return Object.values(groupedOrders);
  }

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await api.get("/orders?clientId=" + data.user.id + "&token=" + data.token);
        const values = groupProductsByOrder(response.data.orders)
        setOrders(values);
      } catch (err) {
        const message = handleError(err);
        addToast({ type: "error", title: 'Carregar dados', message })
      }
    }
    if (orders.length === 0) loadOrders();
  }, [orders]);
  console.log(orders)

  // useEffect(() => {
  //   orders.map(order => {
  //     console.log(order)
  //     products.map(item => {
  //       if (item.id === order.product_id && productsToShow.length < orders.length) {
  //         setProductsToShow(arr => [...arr, { ...order, name: item.name, url: item.url }])
  //       }
  //     }
  //     )
  //   })

  // }, [orders]);

  return (

    <div className={styles.products}>
      {productsToShow.map(product =>
        <OrderCard key={product.id} product={product} />
      )}

    </div>


  );
}
