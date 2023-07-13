import { ROUTES } from 'pages/config';
import { useNavigate } from 'react-router-dom';
import { removeUser } from 'shared/store/reducers/UserSlice';
import { useAppDispatch } from '../redux';

export const useLogOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const dispatchUser = () => {
    dispatch(removeUser());
    navigate(ROUTES.HOME, { replace: true });
  };

  return dispatchUser;
};
