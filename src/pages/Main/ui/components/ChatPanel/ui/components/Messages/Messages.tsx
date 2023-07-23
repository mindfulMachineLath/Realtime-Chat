import React from 'react';
import { Box } from '@mui/material';
import { useGetActiveChat } from 'shared/hook';
import Message from './Message/Message';
import s from './Messages.module.scss';
import { CLOUD, db } from 'firebase.config';
import { doc, onSnapshot } from 'firebase/firestore';

const Messages: React.FC = () => {
  const [messages, setMessages] = React.useState<MessageFirestore[]>([]);
  const { chatID, currentUserID } = useGetActiveChat();

  React.useEffect(() => {
    const onSub = onSnapshot(doc(db, CLOUD.CHATS, chatID), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      onSub();
    };
  }, [chatID]);

  return (
    // TODO: change bg color
    <Box className={s.message_box}>
      <div className={s.scroll}>
        {messages.map((m) => (
          <Message
            key={m.id}
            text={m.text}
            own={m.senderId === currentUserID}
            file={m.image}
          />
        ))}
      </div>
    </Box>
  );
};

export default Messages;
