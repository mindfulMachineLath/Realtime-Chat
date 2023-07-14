import { useAppSelector } from '../redux';

export const useAuthState = () => {
  const tokenStorage = useAppSelector((state) => state.userReducer.token);
  const idStorage = useAppSelector((state) => state.userReducer.id);
  const photo = useAppSelector((state) => state.userReducer.photo);
  const name = useAppSelector((state) => {
    console.log(state);
    return state.userReducer.name;
  });

  return {
    isAuth: !!tokenStorage,
    id: idStorage,
    photo,
    name,
  };
};
