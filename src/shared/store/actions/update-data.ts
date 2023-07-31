import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import { setName } from '../reducers/UserSlice';
import { auth } from 'firebase.config';
import { updateProfile, User } from 'firebase/auth';
import { updateDoc } from 'firebase/firestore';
import { DOC } from 'shared/lib';

export const updateFirestoreData = createAsyncThunk(
  'update/data',
  async (name: string, { rejectWithValue, dispatch, getState }) => {
    try {
      const { id } = (getState() as RootState).userReducer;

      const refFirestore = DOC.users(id as string);

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
