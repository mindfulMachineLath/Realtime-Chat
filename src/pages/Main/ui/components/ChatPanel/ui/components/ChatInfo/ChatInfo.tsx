import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { drawerWidth } from 'pages/Main/ui/Main';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ChatInfo: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <Avatar
            alt="Profile Picture"
            src={'<Avatar alt="Profile Picture" src={person} />'}
          />
          <Box>
            <Typography variant="h6" noWrap component="div">
              Name CHAT
            </Typography>
            <Typography noWrap component="p">
              descriptions
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ChatInfo;
