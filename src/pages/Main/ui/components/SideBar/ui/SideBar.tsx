import { Toolbar, Drawer, Divider, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { drawerWidth } from 'pages/Main/ui/Main';
import React from 'react';
import { Chats, SearchChat } from './component';
import Profile from './component/Menu/Menu';

const SideBar: React.FC = () => {
  const [search, setSearch] = React.useState('');

  const handleSearchChange = (value: string) => {
    console.log('value', value);
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

      <Chats search={search} />
    </Drawer>
  );
};

export default SideBar;
