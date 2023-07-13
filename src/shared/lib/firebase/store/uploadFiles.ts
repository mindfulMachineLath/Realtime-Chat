import { auth, db, storage } from 'firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

interface Upload {
  setError: () => void;
  url: string;
}

// для того чтобы обновить данные, нужно получить предыдущие данные пользователя
// потому что они сихраняются в current User

const uploadFiles = async (file: File) => {
  let url = '';
  //сreate a unique image name
  const date = new Date().getTime();
  const storageRef = ref(storage, `${date}`);

  // TODO: check async operations

  try {
    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        console.log('File available at', downloadURL, auth.currentUser);

        // find user
        if (auth.currentUser) {
          // update auth data user
          await updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          });

          // update data user in firebase
          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            photo: downloadURL,
          });
        }

        return url;
      });
    });
  } catch (err) {}
};

export default uploadFiles;
