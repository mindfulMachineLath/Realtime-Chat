import React from 'react';
import { Toolbar, Drawer, Divider, Box } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Chats, SearchChat, Profile } from './component';
import { DRAWER_WIDTH } from 'shared/const/common';
import { ButtonIcon } from 'shared/ui';
import { and, getDocs, or, query, where } from 'firebase/firestore';
import { usersCollection } from 'firebase.config';

const SideBar: React.FC<IChild> = ({ mobile: mobileOpen, setMobile }) => {
  const [search, setSearch] = React.useState('');
  const [chat, setChat] = React.useState([]);
  const [findedUsers, setfindedUsers] = React.useState<AuthUserData[]>([]);

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

  const drawer = (
    <>
      <Toolbar sx={{ position: 'fixed', pl: 0 }}>
        <Box sx={{ display: 'flex', gap: 1.1 }}>
          <Profile />
          <SearchChat
            onSearchChange={handleSearchChange}
            handleKey={handleKey}
          />
          <ButtonIcon onClick={setMobile}>
            <ArrowForwardIosIcon />
          </ButtonIcon>
        </Box>
      </Toolbar>

      <Divider sx={{ mb: 2 }} />
      <Chats chats={findedUsers} />

      {/* <Chats data={filterCountries({ data: messages, search })} /> */}
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
