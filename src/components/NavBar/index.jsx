
import { useAuth } from '../../context/authContext'

import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import { LogoutOutlined, ShoppingCartOutlined, ShopOutlined } from "@ant-design/icons"


export function Navbar({ kitchen = false }) {
  const { signOut } = useAuth()
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      {!kitchen && <>
        <button onClick={() => navigate('/home')} className={styles.orders}><ShopOutlined /></button>
        <button onClick={() => navigate('/orders')} className={styles.orders}><ShoppingCartOutlined /></button>
      </>}
      <button onClick={() => signOut()} className={styles.logout}><LogoutOutlined /></button>
    </nav>



  )
}
