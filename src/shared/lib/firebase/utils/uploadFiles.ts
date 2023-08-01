import { auth, db, storage } from 'firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { updateProfile, User } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

interface Upload {
  file: File;
  setImg: (url: string) => void;
}

/** функция для загрузки файлов в хранилище firebase(store) с обновленией профиля юзера и данных в хранилище */
const uploadFiles = async ({ file, setImg }: Upload) => {
  // создаем уникальное название файла
  const date = new Date().getTime();

  if (auth.currentUser) {
    const storageRef = ref(storage, `${auth.currentUser.uid + date}`);

    try {
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          setImg(downloadURL);

          try {
            // обновляем профиль
            await updateProfile(auth.currentUser as User, {
              photoURL: downloadURL,
            });

            // обновляем данные в хранилище
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
