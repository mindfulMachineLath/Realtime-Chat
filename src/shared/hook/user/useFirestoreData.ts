import { db } from 'firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { ROUTES } from 'pages/config';
import { useNavigate } from 'react-router-dom';
import { setUser } from 'shared/store/reducers/UserSlice';
import { useAppDispatch } from '../redux';
import { useAuthState } from './useAuthState';

export const useFirestoreData = async () => {
  const dispatch = useAppDispatch();

  const { id } = useAuthState();
  const refFirestore = doc(db, 'users', id as string);
  const docSnap = await getDoc(refFirestore);

  const dispatchUser = () => dispatch(setUser(docSnap.data() as AuthUserData));

  return dispatchUser;
};

// TODO: пока не использую - удалить!
