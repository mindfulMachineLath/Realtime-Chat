import React from 'react';
import { Drawer, Box } from '@mui/material';
import { SideBarComponent } from 'features/search-users';
import { DRAWER_WIDTH } from 'shared/const/common';

const SideBar: React.FC<IChild> = ({ mobile: mobileOpen, setMobile }) => {
  return (
    <Box
      component="nav"
      sx={{
        width: { sm: DRAWER_WIDTH },
        flexShrink: { sm: 0 },
      }}
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
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '100%',
            backgroundColor: '#10101b',
          },
        }}
      >
        <SideBarComponent.Drawer setMobile={setMobile} />
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            backgroundColor: '#10101b',
          },
        }}
        open
      >
        <SideBarComponent.Drawer setMobile={setMobile} />
      </Drawer>
    </Box>
  );
};

export default SideBar;
