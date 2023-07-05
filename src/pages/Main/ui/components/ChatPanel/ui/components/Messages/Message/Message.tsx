import { Avatar, Box, Typography } from '@mui/material';
import s from './Message.module.scss';

interface IMessage {
  src?: string;
  name?: string;
  text?: string;
  own?: boolean;
}

const Message: React.FC<IMessage> = ({ text, own }) => {
  return (
    <Box className={`${own ? `${s.own} ${s.message_box}` : s.message_box}`}>
      <Box className={s.message_info}>
        {/* TODO: подгружать данные по фото с firebase */}
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </Box>
      <Typography variant="body2" className={s.message_text}>
        {text || 'Message 1'}
      </Typography>
    </Box>
  );
};

export default Message;
