/* eslint-disable */
import { Outlet, Navigate } from 'react-router-dom';

import { useAuth } from '../../context/authContext'

export const KitchenRoutes = () => {
  const { isLogged, data } = useAuth()
  

  return (

      
      isLogged() ? data.user.usertype == "kitchen" ? <Outlet/>: <Navigate to="/login" /> : <Navigate to="/login" />
      

  )
}


