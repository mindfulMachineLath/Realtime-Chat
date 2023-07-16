import React from 'react';
import { Box } from '@mui/material';
import { useAppDispatch, useAuthState } from 'shared/hook';
import { getFirestoreData } from 'shared/store/actions';
import { Loader } from 'shared/ui';
import { ChatPanel, SideBar } from './components';

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
