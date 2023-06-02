import { useState } from 'react';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/icon.svg';
import styles from './Home.module.scss';
import { Button, Input, Select, Form } from 'antd';

export const Home: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Select.Option value="86">+86</Select.Option>
        <Select.Option value="87">+87</Select.Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <div className={styles.main_box}>
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'disabled', label: 'Disabled', disabled: true },
          ]}
        />

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: 'Please input your phone number!' },
          ]}
        >
          <Input
            type="tel"
            addonBefore={prefixSelector}
            style={{ width: 200 }}
            placeholder="‒‒‒ ‒‒‒ ‒‒‒‒"
          />
        </Form.Item>
      </div>
    </>
  );
};
