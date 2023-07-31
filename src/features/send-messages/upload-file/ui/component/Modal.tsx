import React from 'react';
import { Box, Modal, Typography, TextField, Button } from '@mui/material';
import s from './Modal.module.scss';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  file: File;
}

// TODO: вынести модалки в отдельный компонент
const NestedModal: React.FC<ModalProps> = ({
  open,
  handleClose,
  title,
  file,
}) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box className={s.box_modal}>
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          className={s.title}
        >
          Send as a {title}
        </Typography>

        <MuiInputStyled
          label="Name"
          defaultValue={inputDefault}
          variant="standard"
          className={s.input}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Box className={s.buttons_box}>
          <Button variant="text" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="text" onClick={handleSaveName}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NestedModal;
