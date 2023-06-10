import { ROUTES } from 'pages/config';
import { useNavigate } from 'react-router-dom';
import { setUser } from 'shared/store/reducers/UserSlice';
import { useAppDispatch } from '../redux';

export const useLoginUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const dispatchUser = ({ phoneNumber, token, id }: AuthUserData) => {
    dispatch(setUser({ phoneNumber, token, id }));
    navigate(ROUTES.MAIN, { replace: true });
  };

  return dispatchUser;
};
