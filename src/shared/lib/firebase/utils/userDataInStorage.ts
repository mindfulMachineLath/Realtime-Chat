import { User } from 'firebase/auth';
import {
  LOCAL_STORAGE_KEYS,
  removeLocalStorage,
  setLocalStorage,
} from 'shared/lib/localStorage';

const handleUserDataInStorage = (user: User | null) => {
  if (user) {
    const { phoneNumber, uid, accessToken } = user as unknown as UserFirebase;
    const userData: AuthUserData = {
      phoneNumber,
      token: accessToken,
      id: uid,
    };
    setLocalStorage(userData, LOCAL_STORAGE_KEYS.USER);
  } else {
    removeLocalStorage(LOCAL_STORAGE_KEYS.USER);
  }
};

export default handleUserDataInStorage;
