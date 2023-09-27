
import { useCart } from '../../context/cartContext';
import styles from './ProductCard.module.css'


export function ProductCard({ product: product }) {

const { cart, setCart } = useCart();
const addOrder = (newProduct) => {
  let productExist = cart.find(item => item.id === newProduct.id);
  if (productExist) {
    setCart(
        cart.map(item =>
          item.id === newProduct.id
            ? { ...productExist, quantity: Number(productExist.quantity) + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { 
        ...newProduct, 
        quantity: 1
      }]);
    }
    productExist = null
    
  };
  

  return(
    <div className={styles.card}>
        <div className={styles.cover}></div>
        <div className={styles.product}>
        <img className={styles.image} src={product.url}/>  
        <div className={styles.textBox}>   
        <span>{product.name}</span>
        <span>R$ {(Number(product.price)/100).toFixed(2)}</span>
        </div>   

        <footer>        
        <button onClick={()=> addOrder(product)}>Adicionar</button>
        </footer>
        </div>
    </div>

)
}