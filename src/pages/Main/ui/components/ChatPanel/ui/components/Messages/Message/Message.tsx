import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { useAuthState, useGetActiveChat } from 'shared/hook';
import { MessageFile } from 'shared/ui';
import s from './Message.module.scss';

interface MessageProps {
  name?: string;
  text?: string;
  image?: string;
  own?: boolean;
  doc?: IDocument;
}

const Message: React.FC<MessageProps> = ({ text, own, image, doc }) => {
  const { photo } = useAuthState();
  const { user } = useGetActiveChat();

  const ref = React.useRef<HTMLElement>();

  React.useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [text]);

  return (
    <Box
      className={`${own ? `${s.own} ${s.message_box}` : s.message_box}`}
      ref={ref}
    >
      <Box className={s.message_info}>
        <Avatar
          alt={user.name + 'avatar'}
          src={own ? (photo as string) : (user.photo as string)}
        />
      </Box>

      {!image ? (
        <Box className={s.message_text}>
          {doc && <MessageFile nameFile={doc.name} sizeFile={doc.size} />}
          {text && <Typography variant="body2">{text}</Typography>}
        </Box>
      ) : (
        <Box className={s.message_image}>
          <img src={image} className={s.img} />
          {text && (
            <Box className={s.message_text}>
              <Typography variant="body2">{text}</Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Message;
