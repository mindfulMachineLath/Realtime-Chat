import React from 'react';
import { Box, Modal, Typography, TextField, Button } from '@mui/material';
import styled from '@emotion/styled';
import { updateFirestoreData } from 'shared/store/actions';
import { useAppDispatch, useAuthState } from 'shared/hook';
import s from './NestedModal.module.scss';

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

        <MuiInputStyled
          label="Name"
          defaultValue={inputDefault}
          variant="standard"
          className={s.input}
          onChange={handleChange}
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
