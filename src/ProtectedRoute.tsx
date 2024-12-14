import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from './app/hooks';


export const ProtectedRoute = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
