
import styles from './styles.module.css'
import { CloseCircleOutlined, FireOutlined, LikeOutlined } from "@ant-design/icons"

export function OrderCard({ products: products, id, status }) {

  return (
    <div className={styles.order}>
      <h2>Id do Pedido: {id}</h2>
      {status == "0" &&
        <CloseCircleOutlined style={{ fontSize: "2rem", color: "red" }} />
      }
      {status == "1" &&
        <FireOutlined style={{ fontSize: "2rem", color: "orange" }} />
      }
      {status == "2" &&
        <LikeOutlined style={{ fontSize: "2rem", color: "green" }} />
      }
      {products.map(product =>
        <div key={product.product_id} className={styles.card}>
          <div className={styles.cover}></div>
          <div className={styles.product}>
            <img className={styles.image} src={product.url} />
            <div className={styles.textBox}>
              <span>{product.name}</span>
              <span>{product.quantity} Unidades</span>
            </div>
          </div>
        </div>
      )}
    </div>

  )
}
