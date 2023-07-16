import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorage, LOCAL_STORAGE_KEYS } from 'shared/lib/localStorage';
import { getFirestoreData, uploadFireStoreFile } from '../actions';

const initialState: AuthUserData = getLocalStorage(LOCAL_STORAGE_KEYS.USER) || {
  phoneNumber: null,
  token: null,
  id: null,
  loading: false,
  name: 'Person',
  photo: null,
  loadingPhoto: false,
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
      state.id = null;
    },
    setImage(state, action: PayloadAction<Pick<AuthUserData, 'photo'>>) {
      state.photo = action.payload.photo;
    },
    setLoadingPhoto(state, action: PayloadAction<boolean>) {
      state.loadingPhoto = action.payload;
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
  },
});

const { actions, reducer } = userSlice;

export const { setUser, removeUser, setImage, setLoadingPhoto } = actions;

export default reducer;
