
import styles from "./styles.module.css"



export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerTitle}>
        <h1>Cardápio Digital</h1>
      </div>
      <div className={styles.headerTitle}>
        <h2>Restaurante Teste</h2>
      </div>
    </div>
  );
};


