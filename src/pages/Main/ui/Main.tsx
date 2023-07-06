import React from 'react';
import { Box } from '@mui/material';
import { ChatPanel, SideBar } from './components';

export const drawerWidth = 340;

const Main: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar mobile={mobileOpen} setMobile={handleDrawerToggle} />
      <ChatPanel mobile={mobileOpen} setMobile={handleDrawerToggle} />
    </Box>
  );
};

export default Main;
