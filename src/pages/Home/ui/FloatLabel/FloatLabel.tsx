import React from 'react';
import styles from './FloatLabel.module.scss';

interface FloatLabelProps {
  children: JSX.Element;
  label: string;
  value: string;
  name: string;
}

const FloatLabel: React.FC<FloatLabelProps> = (props) => {
  const [focus, setFocus] = React.useState(false);
  const { children, label, value, name } = props;

  const labelClass =
    focus || (value && value.length !== 0)
      ? `${styles.label} ${styles['label-float']}`
      : `${styles.label}`;

  return (
    <div
      className={styles['float-label']}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {children}
      <label className={labelClass}>{label}</label>
    </div>
  );
};

export default FloatLabel;
