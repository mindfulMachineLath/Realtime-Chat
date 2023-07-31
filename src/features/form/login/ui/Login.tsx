import React from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { setDoc, getDoc } from 'firebase/firestore';
import { auth } from 'firebase.config';
import { AlertMessages } from 'shared/ui';
import { useLoginUser } from 'shared/hook';
import { Otp, Form } from './components';
import { DOC } from 'shared/lib';

interface LoginProps {
  title: (b: boolean) => void;
}

const initialError = {
  status: false,
  text: '',
};

const Login: React.FC<LoginProps> = ({ title }) => {
  const [showOTP, setShowOTP] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(initialError);

  const setUser = useLoginUser();

  const onCaptchaVerify = (data: FormValue) => {
    if (!(window as CustomWindow).recaptchaVerifier) {
      (window as CustomWindow).recaptchaVerifier = new RecaptchaVerifier(
        'sign-in-button', // добавляем reCAPTCHA в разметку
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

    onCaptchaVerify(data); // вызываем reCAPTCHA

    const appVerifier = (window as unknown as CustomWindow).recaptchaVerifier;

    if (!appVerifier) {
      return;
    }

    signInWithPhoneNumber(auth, data.tel, appVerifier)
      .then((confirmationResult) => {
        (window as CustomWindow).confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        setOpen(true);
        setError(initialError);
        title(true);
      })
      .catch((e) => {
        console.error(e);
        setError({ status: true, text: e.message });
        setLoading(false);
        setOpen(true);
      });
  };

  const onOTPVerifier = (otp: string) => {
    setLoading(true);
    (window as CustomWindow).confirmationResult
      ?.confirm(otp)
      .then(async ({ user }) => {
        const {
          displayName,
          phoneNumber,
          uid: id,
          accessToken: token,
        } = user as unknown as UserFirebase;

        // проверяем есть ли юзер в базе данных
        const refUserFirestore = DOC.users(id);
        const refChatsFirestore = DOC.userChats(id);

        const docSnap = await getDoc(refUserFirestore);

        const initData: AuthUserData = {
          name: displayName || '',
          photo: null,
          phoneNumber,
          id,
          token,
          loading: false,
        };

        // юзера нет - создаем запись в базе данных firestore
        if (!docSnap.exists()) {
          await setDoc(refUserFirestore, initData); // обновляем данные в firestore по user

          await setDoc(refChatsFirestore, {}); // добавляем данные в firestore по чатам

          setUser(initData); // обновляем стор
        } else {
          //  данные юзера есть - берем данные и сетаем в стор
          setUser(docSnap.data() as AuthUserData); // обновляем стор
        }

        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
        setError({ status: true, text: e.message });
      });
  };

  return (
    <>
      <AlertMessages
        text={error.status ? error.text : 'OTP sended successfully!'}
        severity={error.status ? 'error' : 'success'}
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
