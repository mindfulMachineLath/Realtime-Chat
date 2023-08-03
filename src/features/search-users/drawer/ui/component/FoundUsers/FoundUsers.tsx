import React from 'react';
import { Divider } from '@mui/material';
import { useAppDispatch, useAuthState } from 'shared/hook';
import { changeUser } from 'shared/store';
import { ChatListItem } from 'shared/ui';

interface FoundUsersProps {
  foundUsers: AuthUserData[];
  handleSelect: (user: AuthUserData) => void;
}

const FoundUsers: React.FC<FoundUsersProps> = ({
  foundUsers,
  handleSelect,
}) => {
  const dispatch = useAppDispatch();
  const { id } = useAuthState();

  const handleClickOnFindUser = (user: AuthUserData) => {
    handleSelect(user);
    dispatch(changeUser({ user, currentUserID: id }));
  };

  return (
    <>
      {foundUsers.map((user) => (
        <ChatListItem
          key={user.id}
          onClick={() => handleClickOnFindUser(user)}
          src={user.photo || undefined}
          name={user.name}
        />
      ))}
      {!!foundUsers.length && (
        <Divider sx={{ borderBottom: '10px solid #181828' }} />
      )}
    </>
  );
};

export default FoundUsers;
