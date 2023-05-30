import { ROUTES } from 'pages/config';
import { Navigate, useLocation } from 'react-router-dom';

interface IRequireAuth {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: IRequireAuth) => {
  const location = useLocation();
  const isAuth = true;

  return !isAuth ? (
    <Navigate to={ROUTES.LOGIN} state={{ from: location }} />
  ) : (
    children
  );
};

export default PrivateRoute;
