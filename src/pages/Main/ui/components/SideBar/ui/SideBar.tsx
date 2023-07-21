import React from 'react';
import { Toolbar, Drawer, Divider, Box } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Chats, SearchChat, Profile } from './component';
import { DRAWER_WIDTH } from 'shared/const/common';
import { ButtonIcon } from 'shared/ui';
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
import { useAuthState } from 'shared/hook';

const SideBar: React.FC<IChild> = ({ mobile: mobileOpen, setMobile }) => {
  const [search, setSearch] = React.useState('');
  const [chat, setChat] = React.useState([]);
  const [findedUsers, setfindedUsers] = React.useState<AuthUserData[]>([]);

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

  const drawer = (
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

  return (
    <Box
      component="nav"
      sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={setMobile}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100%' },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default SideBar;
