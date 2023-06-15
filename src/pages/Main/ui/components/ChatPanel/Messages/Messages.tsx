import { Box, Typography } from '@mui/material';
import Message from './Message/Message';

const Messages: React.FC = () => {
  return (
    // TODO: change bg color
    <Box sx={{ bgcolor: '#a0ded1', height: '100vh', width: '100vw', my: 8 }}>
      {/* <Typography variant="h6" noWrap component="p">
        this is messages
      </Typography> */}

      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </Box>
  );
};

export default Messages;
