import styles from './OrdersPage.module.css'
import { useNavigate } from 'react-router-dom'


import { Orders } from "../../components/Orders/Orders";
import { Navbar } from "../../components/Navbar/Navbar";

export function OrdersPage() {
  const navigate= useNavigate();
  
  setTimeout(() => window.location.reload(), 60000);

  return (
    <div className={styles.container}>
        <Navbar Component1={Orders} />
    </div>

  );
}