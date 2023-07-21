import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { collection, getFirestore } from 'firebase/firestore';
import handleUserDataInStorage from './shared/lib/firebase/utils/userDataInStorage';

const API_KEY = import.meta.env.VITE_FB_API_KEY;
const DOMAIN = import.meta.env.VITE_FB_AUTH_DOMAIN;
const PROJ_ID = import.meta.env.VITE_FB_PROJ_ID;
const STORAGE = import.meta.env.VITE_FB_STORAGE;
const MESSAGE = import.meta.env.VITE_FB_MESSAGE_SENDER;
const ID = import.meta.env.VITE_FB_APP_ID;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: DOMAIN,
  projectId: PROJ_ID,
  storageBucket: STORAGE,
  messagingSenderId: MESSAGE,
  appId: ID,
};

enum CLOUD {
  USERS = 'users',
  USER_CHATS = 'userChats',
  CHATS = 'chats',
}

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);
const storage = getStorage();

const usersCollection = collection(db, CLOUD.USERS);

auth.onAuthStateChanged((user) => {
  handleUserDataInStorage(user);
});

export { auth, signOut, storage, db, CLOUD, usersCollection };
