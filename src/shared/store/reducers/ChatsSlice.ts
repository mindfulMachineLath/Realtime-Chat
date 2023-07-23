import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorage, LOCAL_STORAGE_KEYS } from 'shared/lib/localStorage';
import { getIdUser } from './UserSlice';

interface ChatsInitialData {
  user: UserInfo;
  chatID: string;
  currentUserID?: string;
}
// TODO: получать данные из firestore!
const initialState: ChatsInitialData = {
  user: {
    id: '',
    name: '',
    photo: 'null',
    phoneNumber: '',
  },
  chatID: 'null',
  currentUserID: getLocalStorage(LOCAL_STORAGE_KEYS.USER)
    ? getLocalStorage(LOCAL_STORAGE_KEYS.USER).id
    : '',

  //
};

const chatsSlice = createSlice({
  name: 'userChats',
  initialState,
  reducers: {
    changeUser(
      state,
      action: PayloadAction<Pick<ChatsInitialData, 'user' | 'currentUserID'>>
    ) {
      const { user, currentUserID } = action.payload;

      state.user = user;

      if (currentUserID) {
        state.currentUserID = currentUserID;

        state.chatID =
          (currentUserID as string) > user.id
            ? currentUserID + user.id
            : user.id + currentUserID;
      }

      state.chatID =
        (state.currentUserID as string) > user.id
          ? state.currentUserID + user.id
          : user.id + state.currentUserID;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getIdUser, (state, action) => {
      console.log(state, action);
    });
  },
});

const { actions, reducer } = chatsSlice;

export const { changeUser } = actions;

export default reducer;
