
import styles from './OrderCard.module.css'
import {CloseCircleOutlined, FireOutlined, LikeOutlined } from "@ant-design/icons"

export function OrderCard({ product: product }) {
  

  return(
    <div className={styles.card}>
        <div className={styles.cover}></div>
        <div className={styles.product}>
        <img className={styles.image} src={product.url}/>  
        <div className={styles.textBox}>   
        <span>{product.name}</span>
        <span>{product.quantity} Unidades</span>        
        </div> 
        {product.status=="0" && 
        <CloseCircleOutlined style={{fontSize:"2rem", color: "red"}}/>    
       }
        {product.status=="1" && 
        <FireOutlined style={{fontSize:"2rem", color: "orange"}}/>   
       }
        {product.status=="2" && 
        <LikeOutlined style={{fontSize:"2rem", color: "green"}}/>     
       }
        

        </div>
    </div>

)
}