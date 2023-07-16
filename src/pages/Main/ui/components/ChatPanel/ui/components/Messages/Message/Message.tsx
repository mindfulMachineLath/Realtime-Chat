import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { useAuthState } from 'shared/hook';
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

  // TODO: как тригернуть изменение аватара на изменение картинки?

  return (
    <Box className={`${own ? `${s.own} ${s.message_box}` : s.message_box}`}>
      <Box className={s.message_info}>
        {/* TODO: подгружать данные по фото с firebase */}
        <Avatar alt="Remy Sharp" src={own ? (photo as string) : undefined} />
      </Box>
      {!file ? (
        <Typography variant="body2" className={s.message_text}>
          {!own && <p>Friend</p>}
          {text || 'Message 1'}
        </Typography>
      ) : (
        <img src={file} className={s.img} />
      )}
    </Box>
  );
};

export default Message;
