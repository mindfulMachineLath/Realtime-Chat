import React from 'react';
import { Box, Divider, Toolbar } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  and,
  doc,
  getDoc,
  getDocs,
  or,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { CLOUD, usersCollection, db } from 'firebase.config';
import { ButtonIcon } from 'shared/ui';
import { Chats, Profile, SearchChat } from './component';

import { useAuthState } from 'shared/hook';

interface IDrawer {
  setMobile: () => void;
}

const Drawer: React.FC<IDrawer> = ({ setMobile }) => {
  const [search, setSearch] = React.useState('');
  const [findedUsers, setfindedUsers] = React.useState<AuthUserData[]>([]);
  const [chat, setChat] = React.useState([]);
  const { id, name, photo } = useAuthState();

  // сетаем значения вводимые в поиск
  const handleSearchChange = async (value: string) => {
    setSearch(value);
  };

  // на ентер ищем юзера
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
    const q = query(
      usersCollection,
      or(
        // query as-is:
        and(
          where('name', '>=', search),
          where('name', '<=', search + '\uf8ff')
        ),
        // capitalize first letter:
        and(
          where('name', '>=', search.charAt(0).toUpperCase() + search.slice(1)),
          where(
            'name',
            '<=',
            search.charAt(0).toUpperCase() + search.slice(1) + '\uf8ff'
          )
        ),
        // lowercase:
        and(
          where('name', '>=', search.toLowerCase()),
          where('name', '<=', search.toLowerCase() + '\uf8ff')
        )
      )
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      if (!findedUsers.includes(doc.data() as AuthUserData)) {
        return setfindedUsers((prev) => [...prev, doc.data() as AuthUserData]);
      }
    });
  };

  const handleSelect = async (user: AuthUserData) => {
    // check whether the group (chat in firestore) exists, if not create

    const combinedId =
      (id as string) > (user.id as string) ? id + user.id : user.id + id;

    console.log(combinedId, user, id);
    try {
      const refChatsFirestore = doc(db, CLOUD.CHATS, combinedId);
      const refChatsCurrentUser = doc(db, CLOUD.USER_CHATS, id as string);
      const refChatsWithUser = doc(db, CLOUD.USER_CHATS, user.id as string);

      const docChatsSnap = await getDoc(refChatsFirestore);

      // create a chat in chats collection
      if (!docChatsSnap.exists()) {
        await setDoc(refChatsFirestore, { messages: [] });

        // create user chats at the companion

        await updateDoc(refChatsWithUser, {
          [combinedId + '.userInfo']: {
            id: user.id,
            name: user.name,
            photo: user.photo,
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        // create user chats at the current user
        await updateDoc(refChatsCurrentUser, {
          [combinedId + '.userInfo']: {
            id: id,
            name: name,
            photo: photo,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
    } catch (err) {
      // TODO: добавить обработку ошибок
    }
    setfindedUsers([]);
    setSearch('');
    // добавить очищение списка поиска и серча
  };

  return (
    <>
      <Toolbar sx={{ position: 'fixed', pl: 0 }}>
        <Box sx={{ display: 'flex', gap: 1.1 }}>
          <Profile />
          <SearchChat
            value={search}
            onSearchChange={handleSearchChange}
            handleKey={handleKey}
          />
          <ButtonIcon onClick={setMobile}>
            <ArrowForwardIosIcon />
          </ButtonIcon>
        </Box>
      </Toolbar>

      <Divider sx={{ mb: 2 }} />
      <Chats chats={findedUsers} onClick={handleSelect} />
    </>
  );
};

export default Drawer;
