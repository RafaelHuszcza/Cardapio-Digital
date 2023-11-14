import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext'

export const LoginRoutes = () => {
  const { isLogged, data } = useAuth()

  return (
    isLogged() ? data.user.userType == "client" ? <Navigate to="/home" /> : <Navigate to="/kitchen" /> : <Outlet />
  )
}

