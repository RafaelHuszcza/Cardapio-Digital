import styles from './Home.module.css'
import { Cart } from "../../components/Cart/Cart";


import { Products } from "../../components/Products/Products";
import { Navbar } from "../../components/Navbar/Navbar";

export function Home() {
  



  return (
    <div className={styles.container}>
        <Navbar Component1={Products} Component2={Cart}/>
    </div>

  );
}