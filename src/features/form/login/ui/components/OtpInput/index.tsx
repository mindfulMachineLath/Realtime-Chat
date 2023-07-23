import React from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { Stack } from '@mui/material';
import { LoadingButton } from 'shared/ui';
import s from './Otp.module.scss';

interface OtpInputProps {
  onClick: (otp: string) => void;
  loading: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({ onClick, loading }) => {
  const [otp, setOtp] = React.useState('');

  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };

  const handleClick = () => {
    onClick(otp);
  };

  return (
    <Stack spacing={4} sx={{ marginTop: '2rem' }}>
      <MuiOtpInput
        value={otp}
        onChange={handleChange}
        length={6}
        autoFocus
        className={s.otp}
      />

      <LoadingButton
        text="Verify OTP"
        loading={loading}
        onClick={handleClick}
      />
    </Stack>
  );
};

export default OtpInput;
