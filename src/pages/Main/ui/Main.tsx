import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box } from '@mui/material';
import { useAppDispatch, useAuthState } from 'shared/hook';
import { AlertMessages, Loader } from 'shared/ui';
import { ErrorBoundary } from 'shared/hoc';
import { getFirestoreData } from 'shared/store';
import { ChatPanel, SideBar } from './components';
import { SettingsProfile } from 'features/edit-profile';

const Main: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const { loading, name } = useAuthState();
  const [openModal, setOpenModal] = React.useState(true);

  React.useEffect(() => {
    dispatch(getFirestoreData());
  }, [dispatch]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (loading) {
    return <Loader />;
  }

  if (!name) {
    return (
      <>
        <AlertMessages
          status={true}
          text=" Please enter your name"
          severity="error"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        />
        <SettingsProfile.AccountData
          open={openModal}
          handleClose={() => setOpenModal(true)}
          active={true}
        />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>MAIN</title>
      </Helmet>
      <ErrorBoundary type="page">
        <Box sx={{ display: 'flex' }}>
          <SideBar mobile={mobileOpen} setMobile={handleDrawerToggle} />
          <ChatPanel mobile={mobileOpen} setMobile={handleDrawerToggle} />
        </Box>
      </ErrorBoundary>
    </>
  );
};

export default Main;
