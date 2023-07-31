import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { useAuthState, useGetActiveChat } from 'shared/hook';
import s from './Message.module.scss';
import { MessageFile } from 'shared/ui';

interface MessageProps {
  src?: string;
  name?: string;
  text?: string;
  file?: string;
  own?: boolean;
  isFile?: boolean;
}

const Message: React.FC<MessageProps> = ({ text, own, file, isFile }) => {
  const { photo } = useAuthState();
  const { user } = useGetActiveChat();

  const ref = React.useRef<HTMLElement>();

  React.useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [text]);

  return (
    <Box
      className={`${own ? `${s.own} ${s.message_box}` : s.message_box}`}
      ref={ref}
    >
      <Box className={s.message_info}>
        <Avatar
          alt={user.name + 'avatar'}
          src={own ? (photo as string) : (user.photo as string)}
        />
      </Box>

      {!file ? (
        <Box className={s.message_text}>
          <MessageFile />

          <Typography variant="body2">{text}</Typography>
        </Box>
      ) : (
        <img src={file} className={s.img} />
      )}
    </Box>
  );
};

export default Message;
