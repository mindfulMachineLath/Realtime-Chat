import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { useAuthState, useGetActiveChat } from 'shared/hook';
import s from './Message.module.scss';

interface IMessage {
  src?: string;
  name?: string;
  text?: string;
  file?: string;
  own?: boolean;
}

const Message: React.FC<IMessage> = ({ text, own, file }) => {
  const { photo } = useAuthState();
  const { user } = useGetActiveChat();

  return (
    <Box className={`${own ? `${s.own} ${s.message_box}` : s.message_box}`}>
      <Box className={s.message_info}>
        <Avatar
          alt="Remy Sharp"
          src={own ? (photo as string) : (user.photo as string)}
        />
      </Box>
      {!file ? (
        <Typography className={s.message_text} variant="body2">
          {text || 'Message 1'}
        </Typography>
      ) : (
        <img src={file} className={s.img} />
      )}
    </Box>
  );
};

export default Message;
