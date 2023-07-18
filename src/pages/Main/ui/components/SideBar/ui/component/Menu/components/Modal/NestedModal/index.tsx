import React from 'react';
import { Box, Modal, Typography, TextField, Button } from '@mui/material';
import { useAuthState } from 'shared/hook';
import s from './NestedModal.module.scss';
import styled from '@emotion/styled';

interface IAccountModal {
  open: boolean;
  handleClose: () => void;
}

const MuiInputStyled = styled(TextField)`
  & input {
    color: #ffffffa8;
  }

  & input::before {
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  }

  & label {
    color: #ffffffa8;
  }

  & fieldset {
    border-color: #ffffffa8;
  }
`;

// TODO: change border color input

const NestedModal: React.FC<IAccountModal> = ({ open, handleClose }) => {
  const { photo, name, loadingPhoto, phoneNumber } = useAuthState();

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box className={s.box_modal}>
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          className={s.title}
        >
          Edit your name
        </Typography>

        <MuiInputStyled
          label="Name"
          defaultValue={name}
          variant="standard"
          className={s.input}
        />

        <Box className={s.buttons_box}>
          <Button variant="text">Cancel</Button>
          <Button variant="text">Save</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NestedModal;
