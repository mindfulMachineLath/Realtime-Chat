import React from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from 'shared/lib/firebase';
import { Alert, Snackbar } from '@mui/material';
import { Otp, Form } from './components';

const Login = () => {
  const [showOTP, setShowOTP] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const onCaptchaVerify = (data: FormValue) => {
    if (!(window as CustomWindow).recaptchaVerifier) {
      (window as CustomWindow).recaptchaVerifier = new RecaptchaVerifier(
        'sign-in-button',
        {
          size: 'invisible',
          callback: () => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit(data);
          },
          'expired-callback': () => {},
        },
        auth
      );
    }
  };

  const onSignInSubmit = (data: FormValue) => {
    setLoading(true);
    onCaptchaVerify(data);

    const appVerifier = (window as unknown as CustomWindow).recaptchaVerifier;
    const phoneNumber = data.tel;

    console.log('appVerifier', appVerifier);

    appVerifier &&
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          (window as CustomWindow).confirmationResult = confirmationResult;
          setLoading(false);
          setShowOTP(true);
          setOpen(true);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
  };

  const onOTPVerifier = (otp: string) => {
    setLoading(true);
    (window as CustomWindow).confirmationResult
      ?.confirm(otp)
      .then(async (res) => {
        console.log(res);
        // setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          OTP sended successfully!
        </Alert>
      </Snackbar>
      {showOTP ? (
        <Otp onClick={onOTPVerifier} />
      ) : (
        <Form onClick={onSignInSubmit} loading={loading} />
      )}
      <div id="sign-in-button"></div>
    </>
  );
};

export default Login;
