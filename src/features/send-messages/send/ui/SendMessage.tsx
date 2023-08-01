import React from 'react';
import { IconButton, InputBase } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {
  updateDoc,
  arrayUnion,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { v4 as uid } from 'uuid';
import { useAuthState, useGetActiveChat } from 'shared/hook';
import { DOC } from 'shared/lib';

const SendMessage: React.FC = () => {
  const { id: currentUser } = useAuthState();
  const { chatID, user } = useGetActiveChat();
  const [value, setValue] = React.useState('');

  const handleKeyBoard = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.target.value);
  };

  const handleSendMessage = async () => {
    const chatReference = DOC.chats(chatID);

    await updateDoc(chatReference, {
      messages: arrayUnion({
        id: uid(),
        text: value,
        senderId: currentUser,
        date: Timestamp.now(),
      }),
    });

    const updateData = {
      [chatID + '.lastMessage']: {
        text: value,
      },
      [chatID + '.date']: serverTimestamp(),
    };

    // обновляем в базе данных запись у юзеров о чате (последнее сообщение, время отправки)
    await updateDoc(DOC.userChats(currentUser), updateData);
    await updateDoc(DOC.userChats(user.id), updateData);

    setValue('');
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
    <>
      <InputBase
        multiline={true}
        sx={{
          ml: 1,
          flex: 1,
          color: '#0daba0',
          width: '50%',
          minHeight: '3rem',
          height: 'auto',
        }}
        placeholder="write a message"
        inputProps={{ 'aria-label': 'write a message' }}
        onChange={handleKeyBoard}
        onKeyDown={handleKey}
        value={value}
      />
      <IconButton aria-label="delete" onClick={handleSendMessage}>
        <SendIcon color="primary" />
      </IconButton>
    </>
  );
};

export default SendMessage;
