import React from 'react';
import { Box, Modal, Typography, TextField, Button } from '@mui/material';
import s from './Modal.module.scss';
import { InputText, MessageFile } from 'shared/ui';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  title?: string;
  image?: string;
  sendFile?: () => void;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

// TODO: вынести модалки в отдельный компонент
const ModalUploadFile: React.FC<ModalProps> = ({
  open,
  handleClose,
  title,
  image,
  sendFile,
  handleChange,
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

        <div className={s.file_container}>
          {image ? <img src={image} className={s.img} /> : <MessageFile />}
        </div>

        <InputText label="Caption" handleChange={handleChange} />

        <Box className={s.buttons_box}>
          <Button variant="text" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="text" onClick={sendFile}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalUploadFile;
