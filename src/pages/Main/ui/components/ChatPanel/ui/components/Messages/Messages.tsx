import { Box } from '@mui/material';
import Message from './Message/Message';
import s from './Messages.module.scss';

const Messages: React.FC = () => {
  return (
    // TODO: change bg color
    <Box className={s.message_box}>
      <div className={s.scroll}>
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
    </Box>
  );
};

export default Messages;
