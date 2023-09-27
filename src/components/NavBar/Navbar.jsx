
import { useAuth } from '../../context/authContext'

import { useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import { LogoutOutlined, ShoppingCartOutlined, ShopOutlined } from "@ant-design/icons"


export function Navbar({ Component1:Component1, Component2:Component2,...props}) {
const { signOut } = useAuth()
const navigate= useNavigate();



  return(
    <main className={styles.container}>
    <div className={styles.navbar}>
    <button onClick={()=> navigate('/home')} className={styles.orders}><ShopOutlined /></button> 
    <button onClick={()=> navigate('/orders')} className={styles.orders}><ShoppingCartOutlined /></button> 
    
    <button onClick={()=> signOut ()} className={styles.logout}><LogoutOutlined /></button>  
        
    </div>    
      <Component1/>
    {(Component2 != undefined) &&
       <Component2/>
    }
    </main>

)
}