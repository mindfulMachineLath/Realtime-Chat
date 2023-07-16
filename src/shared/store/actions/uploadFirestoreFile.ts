import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from 'firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import uploadFiles from 'shared/lib/firebase/store/uploadFiles';
import { RootState } from '..';
import { setUser } from '../reducers/UserSlice';

// TODO: create async in upload
// export const uploadFireStoreFile = createAsyncThunk(
//   'upload/file',
//   async (file: File, setImg: (url: string) => void) => {
//     try {
//       await uploadFiles({ file, setImg });
//     } catch (err) {
//       throw err;
//       //   TODO: обработать здесь или пробросить дальше
//     }
//   }
// );

export const getFirestoreData = createAsyncThunk(
  'get/data',
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const { id } = (getState() as RootState).userReducer;

      const refFirestore = doc(db, 'users', id as string);
      const docSnap = await getDoc(refFirestore);
      const data = docSnap.data() as AuthUserData;

      dispatch(setUser(data));
    } catch (err) {
      return rejectWithValue('Firebase error');
    }
  }
);
