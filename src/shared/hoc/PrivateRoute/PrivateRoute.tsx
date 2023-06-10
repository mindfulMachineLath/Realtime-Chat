import { ROUTES } from 'pages/config';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'shared/hook';

interface IRequireAuth {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: IRequireAuth) => {
  const location = useLocation();
  const { isAuth } = useAuthState();

  return !isAuth ? (
    <Navigate to={ROUTES.HOME} state={{ from: location }} />
  ) : (
    children
  );
};

export default PrivateRoute;
