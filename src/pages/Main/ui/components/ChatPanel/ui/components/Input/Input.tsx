import React from 'react';
import { Box, IconButton, InputBase } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { EmojiSet } from 'shared/ui';
import {
  updateDoc,
  doc,
  arrayUnion,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { CLOUD, db, storage } from 'firebase.config';
import { useAuthState, useGetActiveChat } from 'shared/hook';
import { v4 as uid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import s from './Input.module.scss';

const Input: React.FC = () => {
  const { id } = useAuthState();
  const { chatID, user } = useGetActiveChat();
  // TODO: выгрузить отсюда действующего юзера
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
    setImageUrl(file);
  };

  const handleSendMessage = async () => {
    console.log('uid()', uid(), value, id, Timestamp.now(), chatID);

    if (image) {
      const storageRef = ref(storage, uid());
      await uploadBytesResumable(storageRef, image).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, CLOUD.CHATS, chatID), {
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
      await updateDoc(doc(db, CLOUD.CHATS, chatID), {
        messages: arrayUnion({
          id: uid(),
          text: value,
          senderId: id,
          date: Timestamp.now(),
        }),
      });
    }

    // TODO: необходимо обновить данные о чате, добавив последнее сообщение в базу данных

    // TODO: вынести обнолвения для обоих пользователей в хук
    await updateDoc(doc(db, CLOUD.USER_CHATS, id), {
      [chatID + '.lastMessage']: {
        text: value,
      },
      [chatID + '.date']: serverTimestamp(),
    });

    await updateDoc(doc(db, CLOUD.USER_CHATS, user.id), {
      [chatID + '.lastMessage']: {
        text: value,
      },
      [chatID + '.date']: serverTimestamp(),
    });

    setValue('');
    setImageUrl(null);
  };

  return (
    <Box className={s.send_box}>
      <IconButton aria-label="upload avatar" component="label">
        <AttachFileIcon color="primary" />
        <input hidden type="file" onChange={handleFileUpload} />
      </IconButton>

      <InputBase
        multiline={true}
        className={s.send_input}
        sx={{ ml: 1, flex: 1, color: '#0daba0' }}
        placeholder="write a message"
        inputProps={{ 'aria-label': 'write a message' }}
        onChange={handleKeyBoard}
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
