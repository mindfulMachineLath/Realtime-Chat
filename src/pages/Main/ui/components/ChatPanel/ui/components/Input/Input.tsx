import React from 'react';
import { Box, IconButton, InputBase } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { EmojiSet } from 'shared/ui';
import s from './Input.module.scss';

const Input: React.FC = () => {
  const [imageUrl, setImageUrl] = React.useState<string | ArrayBuffer | null>(
    null
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('this is file', event?.target?.files);
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];
    const reader = new FileReader();
    console.log(reader);

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <Box className={s.send_box}>
      <IconButton aria-label="upload avatar" component="label">
        <AttachFileIcon color="primary" />
        <input hidden type="file" onChange={handleFileUpload} />
      </IconButton>

      <InputBase
        multiline={true}
        className={s.send_input}
        sx={{ ml: 1, flex: 1, color: '#0daba0' }}
        placeholder="write a message"
        inputProps={{ 'aria-label': 'write a message' }}
      />

      {/* TODO: прикрутить эмоции */}
      <EmojiSet />
      {/* <IconButton
        aria-label="delete"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <SentimentSatisfiedAltIcon color="primary" />
      </IconButton> */}

      <IconButton aria-label="delete">
        <SendIcon color="primary" />
      </IconButton>
    </Box>
  );
};

export default Input;
