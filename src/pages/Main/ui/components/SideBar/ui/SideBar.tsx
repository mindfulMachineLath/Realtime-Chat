import React from 'react';
import { Toolbar, Drawer, Divider, Box } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Chats, SearchChat, Profile } from './component';
import { refreshMessages } from './component/Chats/fakeData';
import { filterCountries } from './component/Chats/utils/filterData';
import { DRAWER_WIDTH } from 'shared/const/common';
import { ButtonIcon } from 'shared/ui';

const SideBar: React.FC<IChild> = ({ mobile: mobileOpen, setMobile }) => {
  const [search, setSearch] = React.useState('');
  const [messages, setMessages] = React.useState(() => refreshMessages());

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const drawer = (
    <>
      <Toolbar sx={{ position: 'fixed', pl: 0 }}>
        <Box sx={{ display: 'flex', gap: 1.1 }}>
          <Profile />
          <SearchChat onSearchChange={handleSearchChange} />
          <ButtonIcon onClick={setMobile}>
            <ArrowForwardIosIcon />
          </ButtonIcon>
        </Box>
      </Toolbar>

      <Divider sx={{ mb: 2 }} />

      <Chats data={filterCountries({ data: messages, search })} />
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
