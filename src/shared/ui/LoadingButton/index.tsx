import React from 'react';
import { LoadingButton as Button } from '@mui/lab';
import HttpsIcon from '@mui/icons-material/Https';

interface ButtonProps {
  onClick?: () => void;
  loading: boolean;
  text: string;
}

const LoadingButton: React.FC<ButtonProps> = ({ text, loading, onClick }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      color="secondary"
      size="large"
      loadingPosition="start"
      startIcon={<HttpsIcon />}
      loading={loading}
      onClick={onClick}
    >
      <span> {text}</span>
    </Button>
  );
};

export default LoadingButton;
