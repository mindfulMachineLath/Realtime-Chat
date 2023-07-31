import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import { setUser } from '../reducers/UserSlice';
import { getDoc } from 'firebase/firestore';
import { DOC } from 'shared/lib';

export const getFirestoreData = createAsyncThunk(
  'get/data',
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const { id } = (getState() as RootState).userReducer;

      const refFirestore = DOC.users(id as string);
      const docSnap = await getDoc(refFirestore);
      const data = docSnap.data() as AuthUserData;

      dispatch(setUser(data));
    } catch (err) {
      return rejectWithValue('Firebase error');
    }
  }
);
