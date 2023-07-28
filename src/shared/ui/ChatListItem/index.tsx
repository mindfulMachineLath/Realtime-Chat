import React from 'react';
import { ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import AvatarUsers from '../AvatarUsers';

interface ChatListItemProps {
  onClick: () => void;
  src?: string;
  name?: string;
  message?: string;
  isCurrentUser?: boolean;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  onClick,
  name,
  src,
  message,
  isCurrentUser,
}) => {
  return (
    <ListItem button onClick={onClick}>
      <ListItemAvatar>
        <AvatarUsers
          name={name}
          src={src}
          isCurrentUser={isCurrentUser}
          color="#0daba0"
        />
      </ListItemAvatar>
      <ListItemText primary={name} secondary={message} />
    </ListItem>
  );
};

export default ChatListItem;
