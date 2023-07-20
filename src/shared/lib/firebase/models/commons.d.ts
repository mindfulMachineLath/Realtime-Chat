interface UserFirebase extends import('firebase/auth').User {
  accessToken: string;
  phoneNumber: string;
  uid: string;
  displayName?: string | null;
  photoURL?: null | string;
}

interface AuthUserData {
  phoneNumber: null | string;
  token: null | string;
  id: null | string;
  name?: string | null;
  photo: null | string;
  loading?: boolean;
  loadingPhoto?: boolean;
  loadingName?: boolean;
}
