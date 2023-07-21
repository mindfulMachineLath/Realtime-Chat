import React from 'react';
import {
  Avatar,
  Box,
  Modal,
  Typography,
  Badge,
  Grid,
  Paper,
} from '@mui/material';
import { useAuthState } from 'shared/hook';
import { CameraAlt, Person, LocalPhone } from '@mui/icons-material';
import NestedModal from './NestedModal';
import s from './AccountModal.module.scss';

interface IAccountModal {
  open: boolean;
  handleClose: () => void;
  active?: boolean;
}

const AccountModal: React.FC<IAccountModal> = ({
  open,
  handleClose,
  active,
}) => {
  const { photo, name, loadingName, phoneNumber } = useAuthState();
  const [openModal, setOpenModal] = React.useState(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={s.box_modal}>
        <NestedModal open={openModal} handleClose={() => setOpenModal(false)} />

        {/* TODO: add badge content */}
        {/* TODO: add upload new avatar */}
        <Badge
          badgeContent={<CameraAlt />}
          color="secondary"
          className={s.avatar_badge}
          overlap="circular"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Avatar
            src={photo as string}
            sx={{ mr: '0.5rem' }}
            className={s.avatar}
          />
        </Badge>

        {/* TODO: add number, name, bio */}

        <Typography id="modal-modal-title" variant="h6" component="h2">
          {loadingName ? 'update...' : name}
        </Typography>

        <Box className={s.box_person}>
          {/* name grid */}
          <Grid
            container
            spacing={3}
            className={
              active
                ? `${s.person__data_container} ${s.active_container}`
                : s.person__data_container
            }
            onClick={() => setOpenModal(true)}
          >
            <Grid item xs={1} className={s.data_container}>
              <Paper className={s.person_data}>
                <Person className={s.icon} />
              </Paper>
            </Grid>

            <Grid item xs={6} className={s.data_container}>
              <Paper className={s.person_data}>Name</Paper>
            </Grid>

            <Grid item xs className={s.data_container}>
              <Paper className={s.person_data}>
                {loadingName ? 'update...' : name}
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={3} className={s.person__data_container}>
            <Grid item xs={1} className={s.data_container}>
              <Paper className={s.person_data}>
                <LocalPhone className={s.icon} />
              </Paper>
            </Grid>
            <Grid item xs={6} className={s.data_container}>
              <Paper className={s.person_data}>Phone number</Paper>
            </Grid>
            <Grid item xs className={s.data_container}>
              <Paper className={s.person_data}>{phoneNumber}</Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default AccountModal;
