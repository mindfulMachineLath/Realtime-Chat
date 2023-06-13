import { Toolbar, Drawer, Divider } from '@mui/material';
import { drawerWidth } from 'pages/Main/ui/Main';
import { Chats, SearchChat } from './component';

const SideBar: React.FC = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <SearchChat />
      </Toolbar>

      <Divider />

      <Chats />
    </Drawer>
  );
};

export default SideBar;
