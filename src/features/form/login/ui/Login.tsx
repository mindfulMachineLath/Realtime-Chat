import React from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, CLOUD } from 'firebase.config';
import { AlertMessages } from 'shared/ui';
import { useLoginUser } from 'shared/hook';
import { Otp, Form } from './components';

const Login: React.FC = () => {
  const [showOTP, setShowOTP] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);

  const setUser = useLoginUser();

  const onCaptchaVerify = (data: FormValue) => {
    console.log(auth, 'мы зашли в onCaptchaVerify');
    if (!(window as CustomWindow).recaptchaVerifier) {
      (window as CustomWindow).recaptchaVerifier = new RecaptchaVerifier(
        'sign-in-button',
        {
          size: 'invisible',
          callback: () => {
            console.log('reCAPTCHA');
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

    console.log('onSignInSubmit', data);

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
          setError(false);
        })
        .catch((error) => {
          setError(true);
          console.error(error);
          console.log('signInWithPhoneNumber ERRRRRRR');
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
        const docChatsSnap = await getDoc(refChatsFirestore);

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
          // устанавливаем имя сразу в юзере
          // await updateProfile(auth.currentUser as User, {
          //   displayName: 'Person',
          // });

          // обновляем данные в firestore по user
          await setDoc(refUserFirestore, initData);

          // добавляем данные в firestore по чатам
          await setDoc(refChatsFirestore, {});
          // TODO: нужно сетать данные в стор приложения!

          setUser(initData);
        } else {
          // docChatsSnap.data() && сетать данные в стор!
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
