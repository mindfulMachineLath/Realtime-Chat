import { Box } from '@mui/material';
import { ChatInfo, Input, Messages } from './components';
import s from './ChatPanel.module.scss';

const ChatPanel: React.FC<IChild> = ({ mobile, setMobile }) => {
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
