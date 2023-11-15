
import { useCart } from '../../context/cartContext';
import { CartCard } from '../CartCard';
import styles from './styles.module.css'
import { useToast } from '../../context/toastContext';

import handleError from '../../helpers/errorHandle';
import api from '../../utils/api';
import { useAuth } from '../../context/authContext';


export function Cart() {
  const { addToast } = useToast();
  const { cart, setCart } = useCart();
  const { data } = useAuth();

  const finishOrder = async () => {
    let order = {
      "clientId": data.user.id,
      "products": cart.map(item => { return { productId: item.id, quantity: item.quantity, price: item.price, observation: item.observation ?? null } }),
    }

    try {
      await api.post('/order', order);
      addToast({ type: "success", title: "Pedido", message: "Realizado com Sucesso" });
    }
    catch (err) {
      const message = handleError(err);
      const title = 'Erro ao realizar pedido'
      addToast({ type: "error", title, message });
    }
    setCart([])
  }


  return (
    <div className={cart.length > 0 ? `${styles.cart} ${styles.cartShow}` : `${styles.cart}`}>
      <div className={styles.orderTitle}>
        <h3 >Order#{data.user.id}</h3>
      </div>
      <div className={styles.requests}>
        {cart.map(product => {
          return (
            <CartCard key={product.id} product={product} />

          )
        })}
      </div>
      <div className={styles.submit}>
        <button className={styles.submitButton} onClick={finishOrder}>Fechar Carrinho</button>
      </div>
    </div>

  )
}
