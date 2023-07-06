import React from 'react';
import { Toolbar, Drawer, Divider, Box, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { drawerWidth } from 'pages/Main/ui/Main';
import { Chats, SearchChat } from './component';
import Profile from './component/Menu/Menu';
import { refreshMessages } from './component/Chats/fakeData';
import { filterCountries } from './component/Chats/utils/filterData';

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
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={setMobile}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Divider sx={{ mb: 2 }} />

      <Chats data={filterCountries({ data: messages, search })} />
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default SideBar;
