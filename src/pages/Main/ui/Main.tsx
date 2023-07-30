import React from 'react';
import { Box } from '@mui/material';
import { useAppDispatch, useAuthState } from 'shared/hook';
import { getFirestoreData } from 'shared/store/actions';
import { AlertMessages, Loader } from 'shared/ui';
import { ChatPanel, SideBar } from './components';
import { AccountModal } from 'features/search-users/drawer/ui/component/Menu/components';
import { ErrorBoundary } from 'shared/hoc';

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
        <AccountModal
          open={openModal}
          handleClose={() => setOpenModal(true)}
          active={true}
        />
      </>
    );
  }

  return (
    <ErrorBoundary type="page">
      <Box sx={{ display: 'flex' }}>
        <SideBar mobile={mobileOpen} setMobile={handleDrawerToggle} />
        <ChatPanel mobile={mobileOpen} setMobile={handleDrawerToggle} />
      </Box>
    </ErrorBoundary>
  );
};

export default Main;
