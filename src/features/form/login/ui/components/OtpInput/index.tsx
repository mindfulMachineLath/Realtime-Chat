import React from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import HttpsIcon from '@mui/icons-material/Https';

const OtpInput: React.FC = () => {
  const [otp, setOtp] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };

  return (
    <Stack spacing={4} sx={{ marginTop: '2rem' }}>
      <MuiOtpInput value={otp} onChange={handleChange} length={6} autoFocus />

      <LoadingButton
        type="submit"
        variant="contained"
        color="secondary"
        size="large"
        loadingPosition="start"
        startIcon={<HttpsIcon />}
        loading={loading}
      >
        <span> Verify OTP</span>
      </LoadingButton>
    </Stack>
  );
};

export default OtpInput;
