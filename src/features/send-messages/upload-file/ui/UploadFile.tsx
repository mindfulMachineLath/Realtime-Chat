import React from 'react';
import { IconButton } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const UploadFile: React.FC = () => {
  const [fileUpload, setFile] = React.useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];

    console.log(file.size);
    setFile(file);
  };

  return (
    <>
      <IconButton aria-label="upload avatar" component="label">
        <AttachFileIcon color="primary" />
        <input hidden type="file" onChange={handleFileUpload} />
      </IconButton>
    </>
  );
};

export default UploadFile;
