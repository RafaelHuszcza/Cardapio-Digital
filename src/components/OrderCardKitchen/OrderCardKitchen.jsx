
import styles from './OrderCardKitchen.module.css'
import {CloseCircleOutlined, FireOutlined, LikeOutlined } from "@ant-design/icons"
import api from '../../utils/api'
import { useOrders } from '../../context/ordersContext';

export function OrderCardKitchen({ product: product }) {
  const { orders, setOrders} = useOrders();


  const changeStatus = async ({target}) =>{

    const response = await api.put(`/orders/${product.id}`, {"status" :`${target.id}`})
    setOrders(
      orders.map( order =>     
        product.Id === order.id ?
        {...order, status: `${target.id}`}: order
  
      ))
    
      setTimeout(location.reload.bind(location), 60);
    }


  
  return(
    <div className={styles.card}>
        <div className={styles.cover}></div>
        <div className={styles.product}>
        <img className={styles.image} src={product.url}/>  
        <div className={styles.textBox}>   
        <span>{product.name}</span>
        <span>{product.quantity} Unidades</span>        
        </div> 
        <div className={styles.icons}>
        {product.status=="0" ? 
        <CloseCircleOutlined style={{ border: "4px solid black", fontSize:"2rem", color: "red"}}/>  : 
        <div>
        <div id = "0" className={styles.status} onClick={(e)=> changeStatus(e)}></div>    
        <CloseCircleOutlined style={{ fontSize:"2rem", color: "red"}} />              
        </div>  
        
       }
       {product.status=="1" ?
        <FireOutlined style={{ border: "4px solid black", fontSize:"2rem", color: "orange"}}/> :  
        <div>
        <div id = "1" className={styles.status} onClick={(e)=> changeStatus(e)}></div>    
        <FireOutlined style={{fontSize:"2rem", color: "orange"}}/>              
        </div>  
         
       }
       {product.status=="2" ?
        <LikeOutlined style={{ border: "4px solid black", fontSize:"2rem", color: "green"}}/> :
        <div>
        <div id = "2" className={styles.status} onClick={(e)=> changeStatus(e)}></div>    
        <LikeOutlined style={{fontSize:"2rem", color: "green"}} />              
        </div>  
       }
        
       
        </div> 
        
      
        

        </div>
    </div>

)
}