
import { useCart } from '../../context/cartContext';
import { CartCard } from '../CartCard/CartCard';
import styles from './Cart.module.css'
import { useToast } from '../../context/toastContext';

import handleError from '../../helpers/errorHandle';
import api from '../../utils/api';


export function Cart() {
  const { addToast } = useToast();
  const { cart, setCart } = useCart();
  const client_id = JSON.parse(localStorage.getItem("@taNaMesa:user")).id;

  async function finishOrder() {
    let order = {
      "clientId": client_id,
      "products": cart.map(item => {return { productId : item.id , quantity : item.quantity, price: item.price, observation: item.observation ?? null }}),
    }
    try {   
      const response = await api.post('/order', order);
      if (response.status === 201) {
        addToast({ type: "success", title: "Pedido", message:"Realizado com Sucesso" });
      } else {
        addToast({ type: "error", title: "Erro ao realizar pedido", message: "Tente novamente" });
      }
    }
    catch (err) {
      addToast({ type: "error", title: "Erro ao realizar pedido", message: handleError(err) });
    }
    setCart([])
  }
  return(
    <div 
      className={cart.length > 0? `${styles.cart} ${styles.cartShow}` : `${styles.cart}`}
    >
      <div className={styles.orderTitle}>
      <h3 >Order#{client_id}</h3>
      </div>
      <div className={styles.requests}>
      {cart.map(product => {
        return(   
          <CartCard key={product.id} product={product} />
        )})}
      </div>
      <div className={styles.submit}>
        <button className={styles.submitButton} onClick={finishOrder}>Fechar Carrinho</button>
      </div>
    </div>
  )
}