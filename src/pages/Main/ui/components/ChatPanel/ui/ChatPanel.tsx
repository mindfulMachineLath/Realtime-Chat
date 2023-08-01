import React from 'react';
import { Box, Typography } from '@mui/material';
import { onSnapshot } from 'firebase/firestore';
import { ChatInfo, Messages } from './components';
import { useGetActiveChat } from 'shared/hook';
import { DOC } from 'shared/lib';
import s from './ChatPanel.module.scss';
import { SendMessages } from 'features/send-messages';

const ChatPanel: React.FC<IChild> = ({ mobile, setMobile }) => {
  const { user, chatID } = useGetActiveChat();
  const [messages, setMessages] = React.useState<MessageFirestore[]>([]);

  React.useEffect(() => {
    const onSub = onSnapshot(DOC.chats(chatID), (doc) => {
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

          <Box className={s.send_box}>
            <SendMessages.UploadFile />
            <SendMessages.Send />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChatPanel;
