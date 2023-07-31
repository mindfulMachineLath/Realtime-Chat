import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db, storage } from 'firebase.config';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  StorageError,
} from 'firebase/storage';
import { updateProfile, User } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { RootState } from '..';
import { setImage, setLoadingPhoto } from '../reducers/UserSlice';

/** асинхронный экшен, который отслеживает статус загрузки изображения */
export const uploadFireStoreFile = createAsyncThunk(
  'upload/file',
  async (file: File, { rejectWithValue, dispatch, getState }) => {
    // create a unique image name
    const date = new Date().getTime();
    const { id } = (getState() as RootState).userReducer;

    const storageRef = ref(storage, `${id + '_' + date}`);

    try {
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          dispatch(setLoadingPhoto(true));
        },
        (error) => {
          console.error(error.message);
          dispatch(setLoadingPhoto(false));
          throw new Error('Firebase upload error');
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(auth.currentUser as User, {
              photoURL: downloadURL,
            });

            // update data user in firebase
            await updateDoc(doc(db, 'users', id as string), {
              photo: downloadURL,
            });

            dispatch(setImage({ photo: downloadURL }));
            dispatch(setLoadingPhoto(false));
          });
        }
      );
    } catch (err: unknown) {
      return rejectWithValue((err as StorageError).message);
    }
  }
);
