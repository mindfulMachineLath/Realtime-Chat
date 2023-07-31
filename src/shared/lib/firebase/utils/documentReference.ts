import { CLOUD, db } from 'firebase.config';
import { doc } from 'firebase/firestore';

const DOC = {
  [CLOUD.CHATS]: (segment: string) => doc(db, CLOUD.CHATS, segment),
  [CLOUD.USERS]: (segment: string) => doc(db, CLOUD.USERS, segment),
  [CLOUD.USER_CHATS]: (segment: string) => doc(db, CLOUD.USER_CHATS, segment),
};

export default DOC;
