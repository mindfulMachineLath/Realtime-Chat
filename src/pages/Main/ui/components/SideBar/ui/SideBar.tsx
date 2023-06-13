import { Toolbar, Drawer, Divider, AppBar } from '@mui/material';
import { drawerWidth } from 'pages/Main/ui/Main';
import React from 'react';
import { Chats, SearchChat } from './component';

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
      <Toolbar sx={{ position: 'fixed' }}>
        <SearchChat onSearchChange={handleSearchChange} />
      </Toolbar>

      <Divider sx={{ mb: 2 }} />

      <Chats search={search} />
    </Drawer>
  );
};

export default SideBar;
