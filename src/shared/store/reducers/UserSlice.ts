import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorage, LOCAL_STORAGE_KEYS } from 'shared/lib/localStorage';
import {
  getFirestoreData,
  updateFirestoreData,
  uploadFireStoreFile,
} from '../actions';

const initialState: AuthUserData = getLocalStorage(LOCAL_STORAGE_KEYS.USER) || {
  phoneNumber: null,
  token: null,
  id: null,
  loading: false,
  name: '',
  photo: null,
  loadingPhoto: false,
  loadingName: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUserData>) {
      state.phoneNumber = action.payload.phoneNumber;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.photo = action.payload.photo;
    },
    removeUser(state) {
      state.phoneNumber = null;
      state.token = null;
      state.id = '';
    },
    setImage(state, action: PayloadAction<Pick<AuthUserData, 'photo'>>) {
      state.photo = action.payload.photo;
    },
    setName(state, action: PayloadAction<Pick<AuthUserData, 'name'>>) {
      state.name = action.payload.name;
    },
    setLoadingPhoto(state, action: PayloadAction<boolean>) {
      state.loadingPhoto = action.payload;
    },
    getIdUser(state, action) {
      state.id = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getFirestoreData.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(getFirestoreData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFirestoreData.rejected, (state) => {
      state.loading = true;
    });

    builder.addCase(uploadFireStoreFile.fulfilled, (state) => {
      state.loadingPhoto = false;
    });
    builder.addCase(uploadFireStoreFile.pending, (state) => {
      state.loadingPhoto = true;
    });
    builder.addCase(uploadFireStoreFile.rejected, (state) => {
      state.loadingPhoto = true;
    });
    builder.addCase(updateFirestoreData.fulfilled, (state) => {
      state.loadingName = false;
    });
    builder.addCase(updateFirestoreData.pending, (state) => {
      state.loadingName = true;
    });
    builder.addCase(updateFirestoreData.rejected, (state) => {
      state.loadingName = true;
    });
  },
});

const { actions, reducer } = userSlice;

export const {
  setUser,
  removeUser,
  setImage,
  setLoadingPhoto,
  setName,
  getIdUser,
} = actions;

export default reducer;
