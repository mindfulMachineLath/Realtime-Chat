import React from 'react';
import {  onSnapshot } from 'firebase/firestore';
import { Divider, List, Typography } from '@mui/material';
import s from './Chats.module.scss';
import { useAppDispatch, useAuthState } from 'shared/hook';
import { changeUser } from 'shared/store/reducers/ChatsSlice';
import { DOC } from 'shared/lib/firebase/utils/documentReferense';
import { ChatListItem } from 'shared/ui';

interface ChatsProps {
  findedUsers: AuthUserData[];
  onClick: (user: AuthUserData) => void;
}

const Chats: React.FC<ChatsProps> = ({ findedUsers, onClick }) => {
  const dispatch = useAppDispatch();

  const { id } = useAuthState();
  const [chat, setChat] = React.useState<[string, Data][]>([]);

  const handleClick = ({ userInfo }: Data) => {
    dispatch(changeUser({ user: userInfo, currentUserID: id }));
  };

  const handleClickOnFindUser = (user: AuthUserData) => {
    onClick(user);
    dispatch(changeUser({ user, currentUserID: id }));
  };

  // получаем данные о чатах юзера
  React.useEffect(() => {
    const unsub = onSnapshot(DOC.userChats(id), (doc) => {
      setChat(Object.entries(doc.data() as ChatsData));
    });

    return () => {
      unsub;
    };
  }, []); // TODO: необходимо менять данные при клике!

  if (!chat.length && (!findedUsers || !findedUsers.length)) {
    return (
      <Typography variant="h6" noWrap component="div" sx={{ mt: 6, ml: 4 }}>
        you don't have any active chats yet, enter your friend's name in the
        search
      </Typography>
    );
  }

  return (
    <List
      sx={{ mt: 6, overflow: 'hidden', overflowY: 'auto' }}
      className={s.scroll}
    >
      {findedUsers.map((user) => (
        <ChatListItem
          key={user.id}
          onClick={() => handleClickOnFindUser(user)}
          src={user.photo || undefined}
          name={user.name}
        />
      ))}
      {!!findedUsers.length && <Divider className={s.divider} />}

      {chat.map(([idChats, chatData]) => (
        <ChatListItem
          onClick={() => handleClick(chatData)}
          src={chatData.userInfo?.photo as string | undefined}
          name={chatData.userInfo?.name}
          message={chatData.lastMessage?.text}
        />
      ))}
    </List>
  );
};

export default Chats;
