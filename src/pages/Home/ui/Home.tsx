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
} from '@mui/material';
import { OutlinedInput } from '@mui/material';

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

const Home: React.FC = () => {
  const [codeCountry, setCode] = React.useState('+7');

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleSubmit = (event: Event) => {
    console.log('on sumbit');
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

          <Stack spacing={4}>
            <TextField
              id="outlined-select-currency"
              select
              label="Country"
              defaultValue="Russia Federation"
              className={styles.input}
              // helperText="Please select your currency"
              fullWidth
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              sx={{ outlineColor: 'primary.secondary' }}
              className={styles.input}
              required
              // color="secondary"
              label="Phone Number"
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
        </div>
      </div>
    </>
  );
};

export default Home;
