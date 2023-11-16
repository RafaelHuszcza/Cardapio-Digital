import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext'

export const LoginRoutes = () => {
  const { isLogged } = useAuth()

  if (isLogged()) {
    return <Navigate to="/home" />
  }
  return (
    < Outlet />
  )
}

