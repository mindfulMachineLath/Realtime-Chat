interface UserFirebase extends import('firebase/auth').User {
  accessToken: string;
  phoneNumber: string;
  uid: string;
}

interface AuthUserData {
  phoneNumber: null | string;
  token: null | string;
  id: null | string;
}
