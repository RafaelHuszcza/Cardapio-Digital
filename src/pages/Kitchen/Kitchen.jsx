import styles from './Kitchen.module.css'



import { NavbarKitchen } from '../../components/NavbarKitchen/NavbarKitchen';
import { OrdersKitchen } from '../../components/OrdersKitchen/OrdersKitchen';

export function Kitchen() {

  

  return (

    <div className={styles.container}>
        <NavbarKitchen Component1={OrdersKitchen} />
    </div>

  );
}