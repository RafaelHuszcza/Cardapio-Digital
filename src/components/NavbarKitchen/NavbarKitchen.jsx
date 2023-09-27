
import { useAuth } from '../../context/authContext'


import styles from './NavbarKitchen.module.css'
import { LogoutOutlined} from "@ant-design/icons"


export function NavbarKitchen({ Component1:Component1, Component2:Component2,...props}) {
const { signOut } = useAuth()




  return(
    <main className={styles.container}>
    <div className={styles.navbar}>
   
    
    <button onClick={()=> signOut ()} className={styles.logout}><LogoutOutlined /></button>  
        
    </div>    
      <Component1/>
    {(Component2 != undefined) &&
       <Component2/>
    }
    </main>

)
}