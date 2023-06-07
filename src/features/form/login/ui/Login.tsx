import React from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../../../../firebase';
import { Otp, Form } from './components';

const Login = () => {
  const [showOTP, setShowOTP] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignInSubmit = () => {
    setLoading(true);
    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = '+8';

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const onCaptchaVerify = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'sign-in-button',
        {
          size: 'invisible',
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit();
          },
        },
        auth
      );
    }
  };

  return (
    <>
      {showOTP ? <Otp loading={loading} /> : <Form onClick={onSignInSubmit} />}
      <div id="sign-in-button"></div>
    </>
  );
};

export default Login;
