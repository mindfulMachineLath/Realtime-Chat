import React from 'react';
import { Box, Modal, Typography, Button } from '@mui/material';
import { updateFirestoreData } from 'shared/store';
import { useAppDispatch, useAuthState } from 'shared/hook';
import { InputText } from 'shared/ui';
import s from './Modal.module.scss';

const SettingAccountModal: React.FC<AccountDataProps> = ({
  open,
  handleClose,
}) => {
  const dispatch = useAppDispatch();
  const { name } = useAuthState();
  const [inputDefault, setInputName] = React.useState(name);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.value.replace(/\s/g, '') !== '') {
      setInputName(event.target.value);
    }
  };

  const handleSaveName = () => {
    if (
      inputDefault === name ||
      (inputDefault as string).replace(/\s/g, '') === ''
    ) {
      handleClose();
      return;
    }
    dispatch(updateFirestoreData(inputDefault as string));
    handleClose();
  };

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

        <InputText
          label="Name"
          defaultValue={inputDefault}
          handleChange={handleChange}
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

export default SettingAccountModal;
