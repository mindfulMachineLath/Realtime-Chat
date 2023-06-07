import React from 'react';
import styles from './Home.module.scss';
import {
  Button,
  Typography,
  TextField,
  MenuItem,
  InputAdornment,
  Stack,
  SelectChangeEvent,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useQuery } from '@apollo/client';
import { GET_COUNTRY } from 'shared/const';
import { Loader } from 'shared/ui';
import { Select } from './components';

const Login = () => {
  const [codeCountry, setCode] = React.useState('+7');

  const { data, loading, refetch } = useQuery<DataCountry>(GET_COUNTRY);

  const form = useForm<FormValue>({
    defaultValues: {
      country: 'Russia Federation',
      tel: '',
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const handleChange = (
    event: SelectChangeEvent | React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(`selected ${event.target.value as string}`);
    setCode(event.target.value);
  };

  const onSubmit = (data: FormValue) => {
    console.log('on sumbit', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Select
          register={register('country', {
            onChange: (e) => handleChange(e),
          })}
          data={data}
        />

        <TextField
          {...register('tel', {
            required: 'Phone Number Invalid',
            pattern: {
              value:
                /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g,
              message: 'Phone Number Invalid',
            },
          })}
          error={!!errors.tel}
          color="secondary"
          // className={styles.input}
          label={errors.tel?.message || 'Phone Number'}
          type="tel"
          placeholder="‒‒‒ ‒‒‒ ‒‒‒‒"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{codeCountry}</InputAdornment>
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
  );
};

export default Login;
