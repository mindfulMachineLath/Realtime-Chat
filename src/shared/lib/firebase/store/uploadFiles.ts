import { auth, db, storage } from 'firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { updateProfile, User } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

interface Upload {
  file: File;
  setImg: (url: string) => void;
}

/** функция для загрузки файлов в хранилище firebase(store) */
const uploadFiles = async ({ file, setImg }: Upload) => {
  // create a unique image name
  const date = new Date().getTime();

  if (auth.currentUser) {
    const storageRef = ref(storage, `${auth.currentUser.uid + date}`);

    // TODO: check async operations

    try {
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          setImg(downloadURL);

          try {
            // update auth data user
            await updateProfile(auth.currentUser as User, {
              photoURL: downloadURL,
            });

            // update data user in firebase
            await updateDoc(
              doc(db, 'users', auth?.currentUser?.uid as string),
              {
                photo: downloadURL,
              }
            );
          } catch (err) {
            throw err;
          }
        });
      });
    } catch (err) {
      throw err;
    }
  }
};

export default uploadFiles;
