import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext'

export const LoginRoutes = () => {
  const { isLogged, data } = useAuth()

  return(
  isLogged() ? data.user.usertype == "client"? <Navigate to="/home"/> : <Navigate to="/kitchen"/> : <Outlet/>
  )
}

