import React from 'react';
import { Box, Typography } from '@mui/material';
import { ChatInfo, Input, Messages } from './components';
import { useGetActiveChat } from 'shared/hook';
import { CLOUD, db } from 'firebase.config';
import { doc, onSnapshot } from 'firebase/firestore';
import s from './ChatPanel.module.scss';

const ChatPanel: React.FC<IChild> = ({ mobile, setMobile }) => {
  const { user, chatID } = useGetActiveChat();
  const [messages, setMessages] = React.useState<MessageFirestore[]>([]);

  React.useEffect(() => {
    const onSub = onSnapshot(doc(db, CLOUD.CHATS, chatID), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      onSub();
    };
  }, [chatID, user]);

  if (!user.id) {
    return (
      <>
        <Box className={s.chat_box}>
          <Typography variant="h5" className={s.title}>
            Select a chat to start messaging
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box className={s.chat_box}>
        <ChatInfo mobile={mobile} setMobile={setMobile} />
        <Box className={s.chat_message_box}>
          <Messages messages={messages} />
          <Input />
        </Box>
      </Box>
    </>
  );
};

export default ChatPanel;
