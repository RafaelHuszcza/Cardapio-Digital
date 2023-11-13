/* eslint-disable */
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext'

export const GlobalRoutes = () => {
  const { isLogged, data } = useAuth()
  if (isLogged() && (data.user.userType == "client")) { 
    return <Outlet/> 
  }
  return ( <Navigate to="/login" /> )
}