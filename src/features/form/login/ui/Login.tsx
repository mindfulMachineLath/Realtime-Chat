import React from 'react';
import { Button, Stack } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { MenuProps } from './style';
import { Otp } from './components';

const Login = () => {
  const { handleSubmit, control } = useForm<FormValue>({
    defaultValues: {
      tel: '',
    },
  });

  const onSubmit = (data: FormValue) => {
    console.log('on sumbit', data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <Controller
            name="tel"
            control={control}
            rules={{ validate: matchIsValidTel }}
            render={({ field, fieldState }) => (
              <MuiTelInput
                label={
                  fieldState.invalid ? 'Phone Number Invalid' : 'Phone Number'
                }
                {...field}
                defaultCountry="RU"
                error={fieldState.invalid}
                MenuProps={MenuProps}
              />
            )}
          />

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
      <Otp />
    </>
  );
};

export default Login;
