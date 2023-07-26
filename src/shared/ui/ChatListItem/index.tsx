import React from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { BookmarkBorder, Person } from '@mui/icons-material';

interface IChatList {
  onClick: () => void;
  src?: string;
  name?: string;
  message?: string;
  save?: boolean;
}

const ChatListItem: React.FC<IChatList> = ({
  onClick,
  name,
  src,
  message,
  save,
}) => {
  return (
    <ListItem button onClick={onClick}>
      <ListItemAvatar>
        <Avatar alt={`${name} Picture`} src={src} sx={{ bgcolor: '#0daba0' }}>
          {save ? <BookmarkBorder /> : <Person />}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} secondary={message} />
    </ListItem>
  );
};

export default ChatListItem;
