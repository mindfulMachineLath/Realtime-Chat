import { Toolbar, Drawer, Divider, Box } from '@mui/material';
import { drawerWidth } from 'pages/Main/ui/Main';
import React from 'react';
import { Chats, SearchChat } from './component';
import Profile from './component/Menu/Menu';
import { refreshMessages } from './component/Chats/fakeData';
import { filterCountries } from './component/Chats/utils/filterData';

const SideBar: React.FC = () => {
  const [search, setSearch] = React.useState('');
  const [messages, setMessages] = React.useState(() => refreshMessages());

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
        overflowY: 'inherit',
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar sx={{ position: 'fixed', pl: 0 }}>
        <Box sx={{ display: 'flex', gap: 1.1 }}>
          <Profile />

          <SearchChat onSearchChange={handleSearchChange} />
        </Box>
      </Toolbar>

      <Divider sx={{ mb: 2 }} />

      <Chats data={filterCountries({ data: messages, search })} />
    </Drawer>
  );
};

export default SideBar;
