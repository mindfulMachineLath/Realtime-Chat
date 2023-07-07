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
  data: MessageExample[];
}

const Chats: React.FC<ChatsProps> = ({ data }) => {
  if (!data.length) {
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
      {data.map(({ primary, secondary, person }, index) => (
        <ListItem
          button
          key={index + person}
          onClick={() => console.log('data')}
        >
          <ListItemAvatar>
            <Avatar alt="Profile Picture" src={person} />
          </ListItemAvatar>
          <ListItemText primary={primary} secondary={secondary} />
        </ListItem>
      ))}
    </List>
  );
};

export default Chats;
