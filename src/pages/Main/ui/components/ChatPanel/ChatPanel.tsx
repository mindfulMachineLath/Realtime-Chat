import { AppBar, Toolbar, Typography, Divider } from '@mui/material';
import { drawerWidth } from '../../Main';

const ChatPanel: React.FC = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Panel for data chat
        </Typography>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

export default ChatPanel;
