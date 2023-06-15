import { Box } from '@mui/material';
import ChatInfo from './ChatInfo/ChatInfo';
import Input from './Input/Input';
import Messages from './Messages/Messages';

const ChatPanel: React.FC = () => {
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <ChatInfo />
        <Messages />
        <Input />
      </Box>
    </>
  );
};

export default ChatPanel;
