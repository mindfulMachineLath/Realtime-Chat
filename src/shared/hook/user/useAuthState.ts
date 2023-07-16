import { useAppSelector } from '../redux';

export const useAuthState = () => {
  const tokenStorage = useAppSelector((state) => state.userReducer.token);
  const id = useAppSelector((state) => state.userReducer.id);
  const photo = useAppSelector((state) => state.userReducer.photo);
  const name = useAppSelector((state) => state.userReducer.name);
  const loading = useAppSelector((state) => state.userReducer.loading);

  // console.log(photo, name, 'this is in STORE');

  return {
    isAuth: !!tokenStorage,
    id,
    photo,
    name,
    loading,
  };
};
