import styles from './styles.module.css'
import { Cart } from "../../components/Cart";
import { Products } from "../../components/Products";
import { Navbar } from "../../components/NavBar";
import { OrdersKitchen } from '../../components/OrdersKitchen';
import { Orders } from "../../components/Orders";
export function Main({ kitchen = false, orders = false }) {
  return (
    <main className={styles.container}>
      <Navbar kitchen={kitchen} />
      {kitchen ? <OrdersKitchen /> : <>
        {orders ? <Orders /> : <>
          <Products />
          <Cart />

        </>}
      </>}

    </main >
  );
}
