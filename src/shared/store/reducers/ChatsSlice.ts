import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorage, LOCAL_STORAGE_KEYS } from 'shared/lib/localStorage';

// TODO: получать данные из firestore!
const initialState: AuthUserData = getLocalStorage(LOCAL_STORAGE_KEYS.USER) || {
  phoneNumber: null,
  token: null,
  id: null,
  loading: false,
  name: 'Person',
  photo: null,
  loadingPhoto: false,
  loadingName: false,
};

const chatsSlice = createSlice({
  name: 'userChats',
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<AuthUserData>) {
      state.phoneNumber = action.payload.phoneNumber;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.photo = action.payload.photo;
    },
  },
});

const { actions, reducer } = chatsSlice;

export const { setChats } = actions;

export default reducer;
