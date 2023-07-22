interface ChatsData {
  [key: string]: Data;
}

interface Data {
  date: DateConstructor;
  userInfo: UserInfo;
}

type UserInfo = Pick<AuthUserData, 'id' | 'name' | 'photo' | 'phoneNumber'>;
