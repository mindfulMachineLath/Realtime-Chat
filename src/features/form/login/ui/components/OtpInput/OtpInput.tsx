import React from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';
import styles from './OtpInput.module.scss';
import { Button, Stack } from '@mui/material';

const OtpInput = () => {
  const [otp, setOtp] = React.useState('');

  console.log(otp);

  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };

  return (
    <Stack spacing={4} sx={{ marginTop: '2rem' }}>
      <MuiOtpInput value={otp} onChange={handleChange} length={6} autoFocus />

      <Button type="submit" variant="contained" color="secondary" size="large">
        Next
      </Button>
    </Stack>
  );
};

export default OtpInput;
