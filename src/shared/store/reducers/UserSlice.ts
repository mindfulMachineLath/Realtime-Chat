import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorage, LOCAL_STORAGE_KEYS } from 'shared/lib/localStorage';
import { uploadFireStoreFile } from '../actions/uploadFirestoreFile';

const initialState: AuthUserData = getLocalStorage(LOCAL_STORAGE_KEYS.USER) || {
  phoneNumber: null,
  token: null,
  id: null,
  loading: false,
  name: null,
  photo: null,
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
  },
  // TODO: сделать асинхронный диспач
  extraReducers: (builder) => {
    builder.addCase(uploadFireStoreFile.fulfilled, (state, action) => {
      // Add user to the state array
      // state.entities.push(action.payload);
    });
  },
});

const { actions, reducer } = userSlice;

export const { setUser, removeUser, setImage } = actions;

export default reducer;

// Изменять аватар и имя! - аватар с индикатором загрузки!
//

// builder.addCase(updateFirestore.pending, (state, action) => {
//   state.isLoading = true;

//   action.meta.arg.data.tabs &&
//     (state.tabs = action.meta.arg.data.tabs as Tab[]);

//   action.meta.arg.data.activeKey &&
//     (state.activeKey = action.meta.arg.data.activeKey as string);
// });

// builder.addCase(updateFirestore.fulfilled, (state) => {
//   state.isLoading = false;
// });

// builder.addCase(updateFirestore.rejected, (state) => {
//   state.isLoading = false;
// });
