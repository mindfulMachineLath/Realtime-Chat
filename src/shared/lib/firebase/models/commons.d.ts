interface UserFirebase extends import('firebase/auth').User {
  accessToken: string;
  phoneNumber: string;
  uid: string;
  name?: null | string;
  photo?: null | string;
}

interface AuthUserData {
  phoneNumber: null | string;
  token: null | string;
  id: null | string;
  name: null | string;
  photo: null | string;
}
