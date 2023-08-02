interface IChild {
  mobile: boolean;
  setMobile: () => void;
}

interface MessageFirestore {
  id: string;
  text: string;
  senderId: string;
  date: import('firebase/firestore').Timestamp;
  image?: string;
  document?: IDocument;
}

interface IDocument {
  path: string;
  name: string;
  size: string;
}
