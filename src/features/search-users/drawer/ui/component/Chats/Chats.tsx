import React from 'react';
import { onSnapshot } from 'firebase/firestore';
import { Typography } from '@mui/material';
import s from './Chats.module.scss';
import { useAppDispatch, useAuthState } from 'shared/hook';
import { changeUser } from 'shared/store/reducers/ChatsSlice';
import { DOC } from 'shared/lib/firebase/utils/documentReferense';
import { ChatListItem } from 'shared/ui';

const Chats: React.FC = () => {
  const dispatch = useAppDispatch();

  const { id } = useAuthState();
  const [chat, setChat] = React.useState<[string, Data][]>([]);

  const handleClick = ({ userInfo }: Data) => {
    dispatch(changeUser({ user: userInfo, currentUserID: id }));
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
  // TODO: перенести в store????

  if (!chat.length) {
    return (
      <Typography variant="h6" noWrap component="div" sx={{ mt: 6, ml: 4 }}>
        you don't have any active chats yet, enter your friend's name in the
        search
      </Typography>
    );
  }

  return (
    <>
      {chat.map(([idChats, chatData]) => (
        <ChatListItem
          key={idChats}
          onClick={() => handleClick(chatData)}
          src={chatData.userInfo?.photo as string | undefined}
          name={chatData.userInfo?.name}
          message={chatData.lastMessage?.text}
        />
      ))}
    </>
  );
};

export default Chats;
