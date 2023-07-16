import React from 'react';
import { Box } from '@mui/material';
import { useAppDispatch, useAuthState } from 'shared/hook';
import { ChatPanel, SideBar } from './components';
import { getFirestoreData } from 'shared/store/actions/uploadFirestoreFile';
import { Loader } from 'shared/ui';

const Main: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const { loading } = useAuthState();

  React.useEffect(() => {
    dispatch(getFirestoreData());
  }, [dispatch]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar mobile={mobileOpen} setMobile={handleDrawerToggle} />
      <ChatPanel mobile={mobileOpen} setMobile={handleDrawerToggle} />
    </Box>
  );
};

export default Main;
