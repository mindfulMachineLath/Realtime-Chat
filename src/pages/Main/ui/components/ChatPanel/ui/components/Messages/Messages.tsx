import React from 'react';
import { Box } from '@mui/material';
import { useGetActiveChat } from 'shared/hook';
import Message from './Message/Message';
import s from './Messages.module.scss';
import { CLOUD, db } from 'firebase.config';
import { doc, onSnapshot } from 'firebase/firestore';

const Messages: React.FC = () => {
  const [messages, setMessages] = React.useState([]);
  const { user, chatID } = useGetActiveChat();

  React.useEffect(() => {
    const onSub = onSnapshot(doc(db, CLOUD.CHATS, chatID), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      onSub();
    };
  }, []);

  return (
    // TODO: change bg color
    <Box className={s.message_box}>
      <div className={s.scroll}>
        {messages.map((m) => (
          <Message key={m.id} />
        ))}
        {/* <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message own={true} />
        <Message />
        <Message />
        <Message own={true} />
        <Message />
        <Message own={true} />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message file="src/assets/icon.png" />
        <Message own={true} />
        <Message own={true} />

        <Message text="last message lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat laborum voluptatem, corporis obcaecati quisquam voluptatibus vero adipisci debitis ratione illum itaque pariatur facere cum distinctio, ab impedit animi nihil vel!" /> */}
      </div>
    </Box>
  );
};

export default Messages;
