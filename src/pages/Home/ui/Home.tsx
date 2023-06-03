import React from 'react';
import styles from './Home.module.scss';

// import { Button, Input, Select, Form, Typography } from 'antd';
import {
  Button,
  Typography,
  TextField,
  MenuItem,
  InputAdornment,
  Stack,
  styled,
  ButtonProps,
} from '@mui/material';
import { purple } from '@mui/material/colors';
import { useForm } from 'react-hook-form';

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
  {
    value: 'Russia Federation',
    label: 'Russia Federation',
  },
];

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
})); // TODO: кастомизированная кнопка

type FormValue = {
  country: string;
  tel: string;
};

const Home: React.FC = () => {
  const [codeCountry, setCode] = React.useState('+7');

  const form = useForm<FormValue>({
    defaultValues: {
      country: 'Russia Federation',
      tel: '',
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSubmit = (data: FormValue) => {
    console.log('on sumbit', data);
  };

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.main_wrapper}>
          <div className={styles.home_logo}></div>
          <Typography variant="h1" component="h1">
            Chatty
          </Typography>
          <Typography component="p" className={styles.note}>
            Please confirm your country code and enter your phone number.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <TextField
                {...register('country')}
                color="secondary"
                id="outlined-select-currency"
                select
                label="Country"
                defaultValue="Russia Federation"
                className={styles.input}
                fullWidth
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                {...(register('tel'), { required: 'Phone Number Invalid' })}
                error={!!errors.tel}
                color="secondary"
                className={styles.input}
                label={errors.tel?.message || 'Phone Number'}
                type="tel"
                placeholder="‒‒‒ ‒‒‒ ‒‒‒‒"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {codeCountry}
                    </InputAdornment>
                  ),
                }}
              ></TextField>

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
              >
                Next
              </Button>
            </Stack>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
