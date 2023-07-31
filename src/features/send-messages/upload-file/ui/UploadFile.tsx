import React from 'react';
import { IconButton } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ModalUploadFile from './component/Modal';

const UploadFile: React.FC = () => {
  const [fileUpload, setFile] = React.useState<File | null>(null);
  const [image, setImage] = React.useState<string>('');

  const [open, setClose] = React.useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];
    setClose(true);

    if (file.type.includes('image')) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e?.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);

      return;
    }

    setFile(file);
  };

  return (
    <>
      <IconButton aria-label="upload avatar" component="label">
        <AttachFileIcon color="primary" />
        <input hidden type="file" onChange={handleFileUpload} />
      </IconButton>

      <ModalUploadFile
        open={open}
        handleClose={() => setClose(false)}
        image={image}
        file={fileUpload}
      />
    </>
  );
};

export default UploadFile;
