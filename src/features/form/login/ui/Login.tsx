import React from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, CLOUD } from 'firebase.config';
import { AlertMessages } from 'shared/ui';
import { useLoginUser } from 'shared/hook';
import { Otp, Form } from './components';

interface ILogin {
  title: (b: boolean) => void;
}

const Login: React.FC<ILogin> = ({ title }) => {
  const [showOTP, setShowOTP] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);

  const setUser = useLoginUser();

  const onCaptchaVerify = (data: FormValue) => {
    if (!(window as CustomWindow).recaptchaVerifier) {
      (window as CustomWindow).recaptchaVerifier = new RecaptchaVerifier(
        'sign-in-button', // добавляем reCAPTCHA в контейнер
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
    setError(false);
    setLoading(true);

    onCaptchaVerify(data); // вызываем рекапчу

    const appVerifier = (window as unknown as CustomWindow).recaptchaVerifier;
    const phoneNumber = data.tel;

    appVerifier &&
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          (window as CustomWindow).confirmationResult = confirmationResult;
          setLoading(false);
          setShowOTP(true);
          setOpen(true);
          setError(false);
          title(true);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
          setOpen(true);
        });
  };

  const onOTPVerifier = (otp: string) => {
    setLoading(true);
    (window as CustomWindow).confirmationResult
      ?.confirm(otp)
      .then(async ({ user }) => {
        console.log(user);

        const {
          displayName,
          phoneNumber,
          uid: id,
          accessToken: token,
        } = user as unknown as UserFirebase;

        // check whether the user has data in the database
        const refUserFirestore = doc(db, CLOUD.USERS, id);
        const refChatsFirestore = doc(db, CLOUD.USER_CHATS, id);

        const docSnap = await getDoc(refUserFirestore);

        const initData: AuthUserData = {
          name: displayName || '',
          photo: null,
          phoneNumber,
          id,
          token,
          loading: false,
        };

        // if not - create write in firestore
        if (!docSnap.exists()) {
          await setDoc(refUserFirestore, initData); // обновляем данные в firestore по user

          await setDoc(refChatsFirestore, {}); // добавляем данные в firestore по чатам

          setUser(initData); // обновляем стор
        } else {
          //  if there is - take the data from there
          setUser(docSnap.data() as AuthUserData); // обновляем стор
        }

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  return (
    <>
      <AlertMessages
        text={error ? 'ERROR' : 'OTP sended successfully!'}
        severity={error ? 'error' : 'success'}
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
