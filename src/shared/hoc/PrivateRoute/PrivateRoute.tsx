import { ROUTES } from 'pages/config';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'shared/hook';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const location = useLocation();
  const { isAuth } = useAuthState();

  return !isAuth ? (
    <Navigate to={ROUTES.HOME} state={{ from: location }} />
  ) : (
    children
  );
};

export default PrivateRoute;
