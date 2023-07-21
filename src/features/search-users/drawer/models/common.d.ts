interface ChatsData {
  [key: string]: Data;
}

interface Data {
  date: 'string';
  userInfo: {
    id: string;
    name: string;
    photo: string | null;
  };
}
