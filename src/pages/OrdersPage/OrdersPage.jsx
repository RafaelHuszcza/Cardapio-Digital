import styles from './OrdersPage.module.css'
import { Orders } from "../../components/Orders/Orders";
import { Navbar } from "../../components/Navbar/Navbar";

export function OrdersPage() {
  setTimeout(() => window.location.reload(), 60000);

  return (
    <div className={styles.container}>
      <Navbar Component1={Orders} />
    </div>
  );
}