import { useState } from 'react';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/icon.svg';
import styles from './Home.module.scss';
import { Button, Input, Select, Form, Typography } from 'antd';

export const Home: React.FC = () => {
  const [codeCountry, setCode] = useState('+7');

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleSubmit = (event: Event) => {
    console.log('on sumbit');
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
      <div className={styles.main_container}>
        <div className={styles.main_wrapper}>
          <div className={styles.home_logo}></div>
          <Typography.Title>Chatty</Typography.Title>

          <Typography.Text className={styles.note}>
            Please confirm your country code and enter your phone number.
          </Typography.Text>

          <Form
            name="login"
            layout="vertical"
            onFinish={handleSubmit}
            className={styles.login_form}
            initialValues={{ remember: true }}
            labelWrap
            labelCol={{ span: 10, offset: 0 }}
            requiredMark={false}
            size="large"
          >
            <Form.Item name="country" label="Country">
              <Select
                defaultValue="lucy"
                style={{ width: '100%' }}
                onChange={handleChange}
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="phone"
              label="You phone number"
              rules={[
                { required: true, message: 'Please input your phone number!' },
              ]}
            >
              <Input
                type="tel"
                style={{ width: '100%' }}
                placeholder="‒‒‒ ‒‒‒ ‒‒‒‒"
                prefix={codeCountry}
              />
            </Form.Item>

            <Form.Item>
              <Button style={{ width: '100%' }}>next</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
