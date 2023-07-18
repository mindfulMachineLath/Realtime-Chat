import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import {
  setImage,
  setUser,
  setLoadingPhoto,
  setName,
} from '../reducers/UserSlice';
import { auth, db, storage } from 'firebase.config';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  StorageError,
} from 'firebase/storage';
import { updateProfile, User } from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

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

      // TODO: нужен ли здесь async thunk если все делается на стороне firestore?

      // await uploadBytesResumable(storageRef, file).then(() => {
      //   getDownloadURL(storageRef).then(async (downloadURL) => {
      //     console.log('File available at', downloadURL, auth.currentUser);
      //     // update store
      //     // update auth data user
      //     await updateProfile(
      //       // auth.currentuser
      //       auth.currentUser as User,
      //       {
      //         photoURL: downloadURL,
      //       }
      //     );
      //     // update data user in firebase
      //     await updateDoc(doc(db, 'users', id as string), {
      //       photo: downloadURL,
      //     });

      //     dispatch(setImage({ photo: downloadURL }));
      //   });
      // });
    } catch (err: unknown) {
      return rejectWithValue((err as StorageError).message);
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

export const updateFirestoreData = createAsyncThunk(
  'update/data',
  async (name: string, { rejectWithValue, dispatch, getState }) => {
    try {
      const { id } = (getState() as RootState).userReducer;

      const refFirestore = doc(db, 'users', id as string);

      await updateDoc(refFirestore, {
        name,
      });

      await updateProfile(auth.currentUser as User, {
        displayName: name,
      });

      dispatch(setName({ name }));
    } catch (err) {
      return rejectWithValue('Firebase error');
    }
  }
);
