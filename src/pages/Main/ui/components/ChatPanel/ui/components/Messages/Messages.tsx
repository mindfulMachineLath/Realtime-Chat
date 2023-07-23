import React from 'react';
import { Box } from '@mui/material';
import { useAuthState } from 'shared/hook';
import Message from './Message/Message';
import s from './Messages.module.scss';

interface IMessages {
  messages: MessageFirestore[];
}

const Messages: React.FC<IMessages> = ({ messages }) => {
  const { id } = useAuthState();

  return (
    // TODO: change bg color
    <Box className={s.message_box}>
      <div className={s.scroll}>
        {messages.map((m) => (
          <Message
            key={m.id}
            text={m.text}
            own={m.senderId === id}
            file={m.image}
          />
        ))}
      </div>
    </Box>
  );
};

export default Messages;
