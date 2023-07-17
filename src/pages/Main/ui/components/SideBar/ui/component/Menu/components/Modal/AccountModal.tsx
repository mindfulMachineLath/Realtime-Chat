import React from 'react';
import { Avatar, Box, Modal, Typography, Badge } from '@mui/material';
import s from './AccountModal.module.scss';
import { useAuthState } from 'shared/hook';

interface IAccountModal {
  open: boolean;
  handleClose: () => void;
}

const AccountModal: React.FC<IAccountModal> = ({ open, handleClose }) => {
  const { photo, name, loadingPhoto } = useAuthState();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={s.box_modal}>
        {/* TODO: add badge content */}
        <Badge badgeContent={99} color="secondary" className={s.avatar_badge}>
          <Avatar
            src={photo as string}
            sx={{ mr: '0.5rem' }}
            className={s.avatar}
          />
        </Badge>

        {/* TODO: add number, name, bio */}

        <Typography id="modal-modal-title" variant="h6" component="h2">
          {name}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  );
};

export default AccountModal;
