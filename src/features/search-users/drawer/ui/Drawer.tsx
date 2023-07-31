import React from 'react';
import { Box, Divider, List, Toolbar } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { ButtonIcon } from 'shared/ui';
import { useAuthState } from 'shared/hook';
import { DRAWER_WIDTH } from 'shared/const';
import { ErrorBoundary } from 'shared/hoc';
import { DOC } from 'shared/lib';
import { Chats, FoundUsers, Profile, SearchChat } from './component';
import { getFilterUsersQuery } from '../utils';

import s from './Drawer.module.scss';

interface IDrawer {
  setMobile: () => void;
}

const Drawer: React.FC<IDrawer> = ({ setMobile }) => {
  const [search, setSearch] = React.useState('');
  const [foundUsers, setfindedUsers] = React.useState<AuthUserData[]>([]);
  const { id, name, photo } = useAuthState();

  const handleSearchChange = async (value: string) => {
    setSearch(value);
  };

  const handleKey = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.code === 'Enter' && search !== '') {
      setfindedUsers([]);
      handleSearch();
    }

    if (search === '') {
      setfindedUsers([]);
    }
  };

  const handleSearch = async () => {
    const q = getFilterUsersQuery(search);
    const querySnapshot = await getDocs(q); // получаем данные из базы, по отфильтрованному значению

    querySnapshot.forEach((doc) => {
      if (!foundUsers.includes(doc.data() as AuthUserData)) {
        return setfindedUsers((prev) => [...prev, doc.data() as AuthUserData]);
      }
    });
  };

  const handleSelect = async (user: AuthUserData) => {
    // check whether the group (chat in firestore) exists, if not create

    const combinedId =
      (id as string) > (user.id as string) ? id + user.id : user.id + id;

    const refChatsFirestore = DOC.chats(combinedId);
    const refChatsCurrentUser = DOC.userChats(id as string);
    const refChatsWithUser = DOC.userChats(user.id as string);

    const docChatsSnap = await getDoc(refChatsFirestore);

    // create a chat in chats collection
    if (!docChatsSnap.exists()) {
      await setDoc(refChatsFirestore, { messages: [] });

      // create user chats at the companion

      await updateDoc(refChatsWithUser, {
        [combinedId + '.userInfo']: {
          id: id,
          name: name,
          photo: photo,
        },
        [combinedId + '.date']: serverTimestamp(),
      });

      // create user chats at the current user
      await updateDoc(refChatsCurrentUser, {
        [combinedId + '.userInfo']: {
          id: user.id,
          name: user.name,
          photo: user.photo,
        },
        [combinedId + '.date']: serverTimestamp(),
      });
    }

    setfindedUsers([]);
    setSearch('');
    // добавить очищение списка поиска и серча
  };

  return (
    <>
      <Toolbar
        sx={{
          position: 'fixed',
          pl: 0,
          backgroundColor: '#0daba0',
          width: DRAWER_WIDTH,
          borderRight: '1px solid #2cffff3d',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1.1 }}>
          <ErrorBoundary type="notification">
            <Profile />
          </ErrorBoundary>
          <ErrorBoundary type="notification">
            <SearchChat
              value={search}
              onSearchChange={handleSearchChange}
              handleKey={handleKey}
            />
          </ErrorBoundary>
          <ButtonIcon onClick={setMobile}>
            <ArrowForwardIosIcon />
          </ButtonIcon>
        </Box>
      </Toolbar>
      <Divider sx={{ mb: 2 }} />
      <List
        sx={{ mt: 6, overflow: 'hidden', overflowY: 'auto' }}
        className={s.scroll}
      >
        <ErrorBoundary type="notification">
          <FoundUsers foundUsers={foundUsers} handleSelect={handleSelect} />
        </ErrorBoundary>
        <ErrorBoundary type="notification">
          <Chats />
        </ErrorBoundary>
      </List>
    </>
  );
};

export default Drawer;
