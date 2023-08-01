import React from 'react';
import { Box, IconButton, InputBase } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { EmojiSet } from 'shared/ui';
import {
  updateDoc,
  arrayUnion,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { storage } from 'firebase.config';
import { useAuthState, useGetActiveChat } from 'shared/hook';
import { v4 as uid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import s from './Input.module.scss';
import { DOC } from 'shared/lib';
import UploadFile from 'features/send-messages/upload-file/ui/UploadFile';

const Input: React.FC = () => {
  const { id } = useAuthState();
  const { chatID, user } = useGetActiveChat();
  const [image, setImageUrl] = React.useState<File | null>(null);
  const [value, setValue] = React.useState('');

  const handleKeyBoard = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.target.value);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];

    console.log(file.type);

    if (file.type.includes('image')) {
      console.log(file.size);
    }
    // так как компонент я заменила, не работает отравка файлов в стор
    setImageUrl(file);
  };

  const handleSendMessage = async () => {
    const chatReference = DOC.chats(chatID);

    if (image) {
      const storageRef = ref(storage, uid());
      await uploadBytesResumable(storageRef, image).then(() => {
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
    } else {
      await updateDoc(chatReference, {
        messages: arrayUnion({
          id: uid(),
          text: value,
          senderId: id,
          date: Timestamp.now(),
        }),
      });
    }

    // TODO: вынести обнолвения для обоих пользователей в хук
    await updateDoc(DOC.userChats(id), {
      [chatID + '.lastMessage']: {
        text: value,
      },
      [chatID + '.date']: serverTimestamp(),
    });

    await updateDoc(DOC.userChats(user.id), {
      [chatID + '.lastMessage']: {
        text: value,
      },
      [chatID + '.date']: serverTimestamp(),
    });

    setValue('');
    setImageUrl(null);
  };

  const handleKey = async (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.code === 'Enter') {
      e.preventDefault(); // чтобы убрать перенос строки в инпуте на Enter
      handleSendMessage();
      setValue('');
    }
  };

  return (
    <Box className={s.send_box}>
      <UploadFile sendFile={handleSendMessage} />
      {/* <IconButton aria-label="upload avatar" component="label">
        <AttachFileIcon color="primary" />
        <input hidden type="file" onChange={handleFileUpload} />
      </IconButton> */}

      <InputBase
        multiline={true}
        className={s.send_input}
        sx={{ ml: 1, flex: 1, color: '#0daba0' }}
        placeholder="write a message"
        inputProps={{ 'aria-label': 'write a message' }}
        onChange={handleKeyBoard}
        onKeyDown={handleKey}
        value={value}
      />

      {/* TODO: прикрутить эмоции */}
      {/* <EmojiSet /> */}
      {/* <IconButton
        aria-label="delete"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <SentimentSatisfiedAltIcon color="primary" />
      </IconButton> */}

      <IconButton aria-label="delete" onClick={handleSendMessage}>
        <SendIcon color="primary" />
      </IconButton>
    </Box>
  );
};

export default Input;
