import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
import s from './Chats.module.scss';

interface ChatsProps {
  chats: AuthUserData[];
  onClick: (user: AuthUserData) => void;
}

const Chats: React.FC<ChatsProps> = ({ chats, onClick }) => {
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
      {chats.map((user, index) => (
        <ListItem
          button
          key={(user.id as string) + index}
          onClick={() => onClick(user)}
        >
          <ListItemAvatar>
            <Avatar
              alt="Profile Picture"
              src={user.photo as string | undefined}
            />
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default Chats;
