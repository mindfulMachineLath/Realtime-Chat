import React from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

interface IChatList {
  onClick: () => void;
  src?: string;
  name?: string;
  message?: string;
}

const ChatListItem: React.FC<IChatList> = ({ onClick, name, src, message }) => {
  return (
    <ListItem button onClick={onClick}>
      <ListItemAvatar>
        <Avatar alt={`${name} Picture`} src={src} />
      </ListItemAvatar>
      <ListItemText primary={name} secondary={message} />
    </ListItem>
  );
};

export default ChatListItem;
