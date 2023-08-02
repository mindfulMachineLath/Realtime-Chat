import React from 'react';
import {
  Avatar,
  Box,
  Modal,
  Typography,
  Badge,
  Grid,
  Paper,
  CircularProgress,
} from '@mui/material';
import { CameraAlt, Person, LocalPhone } from '@mui/icons-material';
import { useAppDispatch, useAuthState } from 'shared/hook';
import { uploadFireStoreFile } from 'shared/store';
import { SettingModal } from './components';
import s from './AccountData.module.scss';

const AccountData: React.FC<AccountDataProps> = ({
  open,
  handleClose,
  active,
}) => {
  const dispatch = useAppDispatch();
  const { photo, name, loadingName, phoneNumber, loadingPhoto } =
    useAuthState();
  const [openModal, setOpenModal] = React.useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];
    dispatch(uploadFireStoreFile(file));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={s.box_modal}>
        <SettingModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
        />

        <Badge
          component="label"
          aria-label="upload picture"
          color="secondary"
          className={s.avatar_badge}
          overlap="circular"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          badgeContent={
            <>
              {loadingPhoto ? (
                <CircularProgress color="inherit" />
              ) : (
                <CameraAlt />
              )}

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </>
          }
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

          {/* phone number grid */}
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

export default AccountData;
