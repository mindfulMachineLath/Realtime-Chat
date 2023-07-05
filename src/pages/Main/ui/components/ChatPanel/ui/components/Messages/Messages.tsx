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
        <Message />
        <Message own={true} />
        <Message own={true} />

        <Message text="last message lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat laborum voluptatem, corporis obcaecati quisquam voluptatibus vero adipisci debitis ratione illum itaque pariatur facere cum distinctio, ab impedit animi nihil vel!" />
      </div>
    </Box>
  );
};

export default Messages;
