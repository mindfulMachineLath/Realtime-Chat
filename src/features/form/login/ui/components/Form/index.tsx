import React from 'react';
import { Button, Stack } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { LoadingButton } from '@mui/lab';
import HttpsIcon from '@mui/icons-material/Https';
import { MenuProps } from './style';

interface FormProps {
  onClick: (data: FormValue) => void;
  loading: boolean;
}

const Form: React.FC<FormProps> = ({ onClick, loading }) => {
  const { handleSubmit, control } = useForm<FormValue>({
    defaultValues: {
      tel: '',
    },
  });

  const onSubmit = (data: FormValue) => {
    console.log('on sumbit', data);
    onClick(data);
  };

  return (
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

        <LoadingButton
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          loadingPosition="start"
          startIcon={<HttpsIcon />}
          loading={loading}
        >
          <span> Next</span>
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default Form;
