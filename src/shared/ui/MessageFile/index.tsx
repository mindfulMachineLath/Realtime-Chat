import * as React from 'react';
import { Box, CircularProgress, Fab } from '@mui/material';
import { InsertDriveFile, Save as SaveIcon } from '@mui/icons-material';
import s from './MessageFile.module.scss';

interface MessageFileProps {
  nameFile: string;
  sizeFile: string;
}

const MessageFile: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    }
  };

  return (
    <>
      <Box className={s['box_file-message']}>
        <Fab
          aria-label="save"
          color="primary"
          onClick={handleButtonClick}
          size="small"
        >
          {success ? (
            <SaveIcon fontSize="small" />
          ) : (
            <InsertDriveFile fontSize="small" />
            // TODO: на онклик повесить открытие файла по ссылке
          )}
        </Fab>
        {loading && (
          <CircularProgress
            size={68}
            // TODO: проверить значение размера
            sx={{
              position: 'absolute',
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}

        <div className={s['file-data']}>
          <p>name</p>
          {/* TODO: передавать сюда значения */}
          <span>size</span>
        </div>
      </Box>
    </>
  );
};

export default MessageFile;
