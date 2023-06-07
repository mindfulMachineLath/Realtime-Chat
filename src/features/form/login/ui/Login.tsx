import React from 'react';
import { Otp, Form } from './components';

const Login = () => {
  const [showOTP, setShowOTP] = React.useState(false);

  return <>{showOTP ? <Otp /> : <Form />}</>;
};

export default Login;
