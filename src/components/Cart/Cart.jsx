
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

const finishOrder = async () =>{
  let total = 0

  let order = {
    "clientId": client_id,
    "id": 11,  
    "products": [
     
    ],
  }
  
  { cart.map(item =>     
      {total +=  Number(item.price)*item.quantity
      order.products.push({ productId : item.id , quantity : item.quantity, price: item.price, observation: item.observation != null ? item.observation : null  })
      order = {...order, total:total}
    }) 
  } 
    


    try {   
      const response = await api.post('/order', order);
      addToast({ type: "success", title: "Pedido", message:"Realizado com Sucesso" });

  }
 catch (err) {
  const message = handleError(err);
  const title = 'Erro ao realizar pedido'
  addToast({ type: "error", title, message });
}
setCart([])
}




  return(
    <div className={cart.length > 0? `${styles.cart} ${styles.cartShow}` : `${styles.cart}`}>
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