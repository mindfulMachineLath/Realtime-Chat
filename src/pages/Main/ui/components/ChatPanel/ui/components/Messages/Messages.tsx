import React from 'react';
import { Box } from '@mui/material';
import { useAuthState } from 'shared/hook';
import Message from './Message/Message';
import s from './Messages.module.scss';

interface MessagesProps {
  messages: MessageFirestore[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const { id } = useAuthState();

  return (
    <Box className={s.messages_box}>
      <div className={s.scroll}>
        {messages.map((m) => (
          <Message
            key={m.id}
            text={m.text}
            own={m.senderId === id}
            image={m.image}
            doc={m.document}
          />
        ))}
      </div>
    </Box>
  );
};

export default Messages;
