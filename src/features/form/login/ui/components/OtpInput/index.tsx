import React from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { Stack, Button } from '@mui/material';

interface OtpInputProps {
  onClick: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ onClick }) => {
  const [otp, setOtp] = React.useState('');

  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };

  const handleClick = () => {
    onClick(otp);
  };

  return (
    <Stack spacing={4} sx={{ marginTop: '2rem' }}>
      <MuiOtpInput value={otp} onChange={handleChange} length={6} autoFocus />

      <Button
        type="submit"
        variant="contained"
        color="secondary"
        size="large"
        onClick={handleClick}
      >
        Verify OTP
      </Button>
    </Stack>
  );
};

export default OtpInput;
