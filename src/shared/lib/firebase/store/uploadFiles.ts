import { auth, storage } from 'firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

interface Upload {
  setError: () => void;
  url: string;
}

const uploadFiles = () => {
  const storageRef = ref(storage, 'images/rivers.jpg');

  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      // Handle successful uploads on complete
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        console.log('File available at', downloadURL);

        // нашли юзера и обновили фоточку хе хе
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          });
        }
      });
    }
  );
};

// нужно ли выносить updateProfile в отдельный хук? передавать ли данные о пользователе в uploadFiles?

export default uploadFiles;
