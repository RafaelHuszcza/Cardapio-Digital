import { AppRoutes } from './routes'
import { AuthProvider } from "./context/authContext";
import { Buffer } from 'buffer'
import { ToastProvider } from './context/toastContext';

import './styles.css'
import { UsersProvider } from './context/usersContext';
import { CartProvider } from './context/cartContext';
import { ProductsProvider } from './context/productsContext';
import { OrdersProvider } from './context/ordersContext';

globalThis.Buffer = Buffer


export function App() {

  return (
  
    <ToastProvider>
      <AuthProvider>
        <UsersProvider>
          <OrdersProvider>
          <ProductsProvider>
            <CartProvider>
              <AppRoutes/>
            </CartProvider>
          </ProductsProvider>
          </OrdersProvider>
        </UsersProvider>        
      </AuthProvider>
    </ToastProvider>
  
  )
}

