import React from 'react';
import s from './BackgroundStars.module.scss';

const BackgroundStars: React.FC = () => {
  return (
    <div>
      <div className={s.starsec} />
      <div className={s.starthird} />
      <div className={s.starfourth} />
      <div className={s.starfifth} />
    </div>
  );
};

export default BackgroundStars;
