import { AppBar } from '@mui/material';
import { drawerWidth } from '../../Main';
import ChatInfo from './ChatInfo/ChatInfo';
import Messages from './Messages/Messages';

const ChatPanel: React.FC = () => {
  return (
    <>
      <ChatInfo />
      <Messages />
    </>
  );
};

export default ChatPanel;
