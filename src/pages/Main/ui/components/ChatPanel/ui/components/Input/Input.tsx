import React from 'react';
import { Box, IconButton, InputBase } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import s from './Input.module.scss';

const Input: React.FC = () => {
  return (
    <Box className={s.send_box}>
      {/* TODO: прикрутить файлы */}
      <IconButton aria-label="delete" onClick={() => console.log('FILE')}>
        <AttachFileIcon color="primary" />
      </IconButton>

      <InputBase
        multiline={true}
        className={s.send_input}
        sx={{ ml: 1, flex: 1, color: '#0daba0' }}
        placeholder="write a message"
        inputProps={{ 'aria-label': 'write a message' }}
      />

      {/* TODO: прикрутить эмоции */}
      <IconButton aria-label="delete" onClick={() => console.log('ICON')}>
        <SentimentSatisfiedAltIcon color="primary" />
      </IconButton>

      <IconButton aria-label="delete">
        <SendIcon color="primary" />
      </IconButton>
    </Box>
  );
};

export default Input;
