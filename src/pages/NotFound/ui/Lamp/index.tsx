import s from './Lamp.module.scss';

export const Lamp: React.FC = () => {
  return (
    <div className={s.lamp__wrap}>
      <div className={s.lamp}>
        <div className={s.cable} />
        <div className={s.cover} />
        <div className={s['in-cover']}>
          <div className={s.bulb} />
        </div>
        <div className={s.light} />
      </div>
    </div>
  );
};

export default Lamp;
