import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import { setImage, setUser } from '../reducers/UserSlice';
import { auth, db, storage } from 'firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { updateProfile, User } from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

// TODO: create async in upload
export const uploadFireStoreFile = createAsyncThunk(
  'upload/file',
  async (file: File, { rejectWithValue, dispatch, getState }) => {
    // create a unique image name
    const date = new Date().getTime();
    const { id } = (getState() as RootState).userReducer;

    const storageRef = ref(storage, `${id + '_' + date}`);

    try {
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          console.log('File available at', downloadURL, auth.currentUser);
          // update store
          dispatch(setImage({ photo: downloadURL }));

          // update auth data user
          await updateProfile(
            // auth.currentuser
            (getState() as RootState).userReducer as unknown as User,
            {
              photoURL: downloadURL,
            }
          );

          // update data user in firebase
          await updateDoc(doc(db, 'users', id as string), {
            photo: downloadURL,
          });
        });
      });
    } catch (err) {
      return rejectWithValue('Firebase upload error');
    }
  }
);

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
