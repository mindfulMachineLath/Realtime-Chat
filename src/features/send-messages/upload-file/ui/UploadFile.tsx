import React from 'react';
import { IconButton } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ModalUploadFile from './component/Modal';
import { DOC } from 'shared/lib';
import { useAuthState, useGetActiveChat } from 'shared/hook';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'firebase.config';
import { v4 as uid } from 'uuid';
import { updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';

interface UploadFileProps {
  sendFile: () => void;
}

const UploadFile: React.FC<UploadFileProps> = ({ sendFile }) => {
  const [fileUpload, setFile] = React.useState<File | null>(null);
  const [fileImage, setImage] = React.useState('');
  const [value, setValue] = React.useState('');
  const [open, setClose] = React.useState(false);
  const { chatID, user } = useGetActiveChat();
  const { id } = useAuthState();

  const handleKeyBoard = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.target.value);
  };

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];
    setClose(true);

    if (file.type.includes('image')) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e?.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    setFile(file);
  };

  const handleSendFileToServer = async () => {
    const chatReference = DOC.chats(chatID);

    if (fileUpload) {
      const storageRef = ref(storage, uid());
      await uploadBytesResumable(storageRef, fileUpload).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(chatReference, {
            messages: arrayUnion({
              id: uid(),
              image: downloadURL,
              senderId: id,
              date: Timestamp.now(),
              text: value,
            }),
          });
        });
      });
    }
  };

  const handleCancelMessage = () => {
    setImage('');
    setFile(null);
    setClose(false);
  };

  return (
    <>
      <IconButton aria-label="upload avatar" component="label">
        <AttachFileIcon color="primary" />
        <input hidden type="file" onChange={handleUploadFile} />
      </IconButton>

      <ModalUploadFile
        open={open}
        handleClose={handleCancelMessage}
        image={fileImage}
        sendFile={handleSendFileToServer}
        handleChange={handleKeyBoard}
      />
    </>
  );
};

export default UploadFile;
