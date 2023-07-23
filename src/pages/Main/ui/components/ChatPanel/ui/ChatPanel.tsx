import { Box, Typography } from '@mui/material';
import { ChatInfo, Input, Messages } from './components';
import s from './ChatPanel.module.scss';
import { useGetActiveChat } from 'shared/hook';

const ChatPanel: React.FC<IChild> = ({ mobile, setMobile }) => {
  const { user } = useGetActiveChat();

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
          <Messages />
          <Input />
        </Box>
      </Box>
    </>
  );
};

export default ChatPanel;
