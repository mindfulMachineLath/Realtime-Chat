import {
  Toolbar,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@mui/material';
import { drawerWidth } from 'pages/Main/ui/Main';
import Chats from './Chats/Chats';
import SearchChat from './Search/Search';

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
