import React from 'react';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from 'firebase.config';
import { AlertMessages } from 'shared/ui';
import { useLoginUser } from 'shared/hook';
import { Otp, Form } from './components';

// ПРИ входе все данные есть, но при перезагрузки страницы нет! получать данные нужно с firebase либо складывать все в хранилище

const Login: React.FC = () => {
  const [showOTP, setShowOTP] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const setUser = useLoginUser();

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
      .then(async ({ user }) => {
        const {
          phoneNumber,
          uid: id,
          accessToken: token,
        } = user as unknown as UserFirebase;

        // check whether the user has data in the database
        const refFirestore = doc(db, 'users', id);
        const docSnap = await getDoc(refFirestore);

        const initData: AuthUserData = {
          name: 'Person',
          photo: null,
          phoneNumber,
          id,
          token,
          loading: false,
        };

        // if not - create write in firestore
        if (!docSnap.exists()) {
          // устанавливаем имя сразу в юзере
          // await updateProfile(auth.currentUser as User, {
          //   displayName: 'Person',
          // });

          await setDoc(refFirestore, initData);
          setUser(initData);
        } else {
          // console.log('docSnap.data()', docSnap.data());
          setUser(docSnap.data() as AuthUserData);
          // устанавливаем имя сразу в юзере
          // await updateProfile(auth.currentUser as User, {
          //   displayName: docSnap.data().name,
          // });
        }
        //  if there is - take the data from there

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <AlertMessages
        text="OTP sended successfully!"
        severity="success"
        close={() => setOpen(false)}
        status={open}
      />

      {showOTP ? (
        <Otp onClick={onOTPVerifier} loading={loading} />
      ) : (
        <Form onClick={onSignInSubmit} loading={loading} />
      )}
      <div id="sign-in-button" />
    </>
  );
};

export default Login;
