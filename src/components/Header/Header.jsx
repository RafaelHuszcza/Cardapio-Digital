
import { useNavigate } from 'react-router-dom'
import styles from "./Header.module.css"



export const Header = () => {
  const navigate= useNavigate();

  return (
    <div className={styles.header}>
      <div className={styles.headerTitle}>
      <h1>Tá na Mesa</h1>
      </div>
      <div className={styles.headerTitle}>
      <h2>Restaurante</h2>
      </div>
    </div>
  );
};


