import React from 'react';
import { Avatar } from '@mui/material';
import { BookmarkBorder, Person } from '@mui/icons-material';

interface AvatarUsersProps {
  src?: string;
  name?: string;
  color?: string;
  isCurrentUser?: boolean;
}

const AvatarUsers: React.FC<AvatarUsersProps> = ({
  name,
  src,
  color,
  isCurrentUser,
}) => {
  return (
    <Avatar alt={`${name} Picture`} src={src} sx={{ bgcolor: color }}>
      {isCurrentUser ? <BookmarkBorder /> : <Person />}
    </Avatar>
  );
};

export default AvatarUsers;
