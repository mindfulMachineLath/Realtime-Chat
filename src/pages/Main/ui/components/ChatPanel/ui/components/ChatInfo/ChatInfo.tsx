import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AvatarUsers, ButtonIcon } from 'shared/ui';
import { DRAWER_WIDTH } from 'shared/const/common';
import { useGetActiveChat } from 'shared/hook';

const ChatInfo: React.FC<IChild> = ({ mobile, setMobile }) => {
  const { user, currentUserID } = useGetActiveChat();
  const isCurrentUserChat = currentUserID === user.id;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: `${DRAWER_WIDTH}px`,
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <ButtonIcon onClick={setMobile}>
            <ArrowBackIosNewIcon />
          </ButtonIcon>

          <AvatarUsers
            name={user.name}
            src={
              isCurrentUserChat ? undefined : (user.photo as string | undefined)
            }
            isCurrentUser={isCurrentUserChat}
          />

          <Box>
            <Typography variant="h6" noWrap component="div">
              {isCurrentUserChat ? 'Saved Messages' : user.name}
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
