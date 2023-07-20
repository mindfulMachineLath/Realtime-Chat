import React from 'react';
import { Stack, TextField } from '@mui/material';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { matchIsValidTel } from 'mui-tel-input';
import { LoadingButton } from 'shared/ui';
import { MenuProps, MuiInputStyled, MuiTelInputStyled } from './style';
import { textValidate } from './utils/validate';

interface FormProps {
  onClick: (data: FormValue) => void;
  loading: boolean;
}

const Form: React.FC<FormProps> = ({ onClick, loading }) => {
  const { handleSubmit, control } = useForm<FieldValues>({
    defaultValues: {
      tel: '',
      name: '',
    },
  });

  const onSubmit = (data: FieldValues) => {
    onClick(data as FormValue);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Controller
          name="tel"
          control={control}
          rules={{ validate: matchIsValidTel }}
          render={({ field, fieldState }) => (
            <MuiTelInputStyled
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
        <Controller
          name="name"
          control={control}
          rules={{ validate: textValidate }}
          render={({ field, fieldState }) => (
            <MuiInputStyled
              label={fieldState.invalid ? 'Name Invalid' : 'Name'}
              {...field}
              error={fieldState.invalid}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />

        <LoadingButton text="Next" loading={loading} />
      </Stack>
    </form>
  );
};

export default Form;
