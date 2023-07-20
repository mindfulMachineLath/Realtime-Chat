import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
import { MessageExample } from './fakeData';
import s from './Chats.module.scss';

interface ChatsProps {
  chats: AuthUserData[];
}

const Chats: React.FC<ChatsProps> = ({ chats }) => {
  if (!chats || !chats.length) {
    return (
      <Typography variant="h6" noWrap component="div" sx={{ mt: 6, ml: 4 }}>
        ooops...
      </Typography>
    );
  }

  return (
    <List
      sx={{ mt: 6, overflow: 'hidden', overflowY: 'auto' }}
      className={s.scroll}
    >
      {chats.map(({ name, photo, id }, index) => (
        <ListItem
          button
          key={(id as string) + index}
          onClick={() => console.log('data')}
        >
          <ListItemAvatar>
            <Avatar alt="Profile Picture" src={photo as string | undefined} />
          </ListItemAvatar>
          <ListItemText primary={name} secondary={name} />
        </ListItem>
      ))}
    </List>
  );
};

export default Chats;
