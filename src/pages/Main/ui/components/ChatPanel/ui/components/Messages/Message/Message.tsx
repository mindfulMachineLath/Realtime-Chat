import { Avatar, Box, Typography } from '@mui/material';
import s from './Message.module.scss';

const Message: React.FC = () => {
  return (
    <Box className={s.message_box}>
      <Box className={s.message_info}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </Box>
      <Typography variant="body2" className={s.message_text}>
        Message 1
      </Typography>
    </Box>
  );
};

export default Message;
