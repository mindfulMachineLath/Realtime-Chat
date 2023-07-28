/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import BackgroundStars from '../BackgroundStars';
import s from './ErrorFallback.module.scss';

const ErrorAppNotification: React.FC = () => {
  return (
    <>
      <BackgroundStars />
      <h2 className={s.app_title}>
        Oops, an unexpected error occurred and the app does not work. Please,
        try later once again.
      </h2>
    </>
  );
};

export default ErrorAppNotification;
