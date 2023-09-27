
import { useCart } from '../../context/cartContext';
import {useState} from "react";
import styles from './CartCard.module.css'
import {DeleteOutlined} from "@ant-design/icons"


export function CartCard({ product: product }) {

const { cart, setCart } = useCart();


const switchQuantity = (e,product) => {
  let newQuantity = e.target.value
  
    setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...product, quantity: Number(newQuantity) }
            : item
        )
      );  

  };

const addObservation = (e,product) =>{
  const obs = e.target.value
  setCart(
    cart.map(item =>
      item.id === product.id
        ? { ...product, observation: obs }
        : item
    ))

}

const deleteProduct = (product) =>{
  setCart( cart.filter(item =>
      item.id !== product.id ))

}

  return(
    <div className={styles.cart}>
      <div className={styles.product}>
      <img className={styles.image} src={product.url}/> 
      <div className={styles.productInfo}>
      <span>{product.name}</span>
      <span>R$ {(Number(product.price)/100).toFixed(2)}</span>
      </div>  
      <input className={styles.quantity}  type="Number"  value={product.quantity} onChange={(e)=> switchQuantity(e,product)}/>
      <div className={styles.finalValue}>
      <span>R$ {(((Number(product.price)/100))*product.quantity).toFixed(2)}</span>
      </div>  

      </div>
      <div className={styles.observationBox}>
      <textarea className={styles.observation} type="text" placeholder="Tem alguma observação..." value={product?.observation} onChange={(e)=> addObservation(e,product)}/>
      <div className={styles.delete}>
        <button className={styles.deleteButton} onClick={()=> deleteProduct(product)}><DeleteOutlined /></button>
      </div>
      </div>
   

      


    </div>

)
}