interface ChatsData {
  [key: string]: Data;
}

interface Data {
  date: import('firebase/firestore').Timestamp;
  userInfo: UserInfo;
  lastMessage: {
    text: string;
  };
}

type UserInfo = Pick<AuthUserData, 'id' | 'name' | 'photo' | 'phoneNumber'>;
