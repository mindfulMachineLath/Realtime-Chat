import s from './ErrorNotFound.module.scss';

export const ErrorNotFound: React.FC = () => {
  return (
    <section className={s.error}>
      <div className={s.error__content}>
        <div className={`${s.error__message} ${s.message}`}>
          <h1 className={s.message__title}>Page Not Found</h1>
          <p className={s.message__text}>
            We're sorry, the page you were looking for isn't found here. The
            link you followed may either be broken or no longer exists. Please
            try again, or take a look at our.
          </p>
        </div>
        <div className={`${s.error__nav} ${s['e-nav']}`}>
          <a href="/main" target="_blanck" className={s['e-nav__link']}></a>
        </div>
      </div>
    </section>
  );
};

export default ErrorNotFound;
