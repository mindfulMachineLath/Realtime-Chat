import { db } from 'firebase.config';
import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { USERS } from './const/collection';
import { INIT_FIRESTORE } from './const/init';
// import { db } from 'firebase';
// import { INIT_FIRESTORE } from './constant';

// export const getFirestoreData = async (uid: string) => {
//   try {
//     const tabCollectionsRef = collection(db, 'settings');

//     const data = await getDocs(tabCollectionsRef);
//     const filteredData = data.docs
//       .map((docs) => ({
//         ...docs.data(),
//         id: docs.id,
//       }))
//       .filter((item) => item.id === uid);
//     const initValue = !filteredData.length ? null : filteredData[0];

//     if (initValue) {
//       const stringTabsArray = (initValue as IFirestoreData).tabs as string[];

//       const tabsArr = parseArray(stringTabsArray).map((item) => ({
//         ...item,
//         response: { data: '', isLoading: false, error: undefined },
//       }));

//       return {
//         ...initValue,
//         tabs: tabsArr,
//       } as IFirestoreData;
//     }

//     return initValue;
//   } catch {
//     throw new Error('Getting data from Firestore failed');
//   }
// };

// export const updateFirestoreData = async (
//   id: string,
//   data: FirestoreUpdateKeys
// ) => {
//   try {
//     const userSettingsRef = doc(db, 'settings', id);
//     await updateDoc(userSettingsRef, data);
//   } catch (error) {
//     throw new Error('Firebase updating failed');
//   }
// };

// Add a new document in collection "users"
export const createFirestoreWrite = async (uid: string) => {
  try {
    await setDoc(doc(db, USERS, uid), INIT_FIRESTORE);
  } catch (error) {
    console.error(error);
  }
};
