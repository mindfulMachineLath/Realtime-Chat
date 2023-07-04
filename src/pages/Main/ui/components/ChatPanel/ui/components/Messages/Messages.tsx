import { Box } from '@mui/material';
import Message from './Message/Message';
import s from './Messages.module.scss';

const Messages: React.FC = () => {
  return (
    // TODO: change bg color
    <Box className={s.message_box}>
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </Box>
  );
};

export default Messages;
