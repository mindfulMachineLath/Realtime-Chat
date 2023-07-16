import { useAppSelector } from '../redux';

export const useAuthState = () => {
  const { token, id, photo, name, loading, phoneNumber, loadingPhoto } =
    useAppSelector((state) => state.userReducer);

  return {
    isAuth: !!token,
    id,
    photo,
    name,
    loading,
    phoneNumber,
    loadingPhoto,
  };
};
