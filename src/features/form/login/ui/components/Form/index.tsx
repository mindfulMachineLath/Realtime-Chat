import React from 'react';
import { Stack } from '@mui/material';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { LoadingButton } from 'shared/ui';
import { MenuProps } from './style';
import styled from '@emotion/styled';

const MuiTelInputStyled = styled(MuiTelInput)`
  & input {
    color: #ffffffa8;
  }

  & label {
    color: #ffffffa8;
  }

  & fieldset {
    border-color: #ffffffa8;
  }
`;

interface FormProps {
  onClick: (data: FormValue) => void;
  loading: boolean;
}

const Form: React.FC<FormProps> = ({ onClick, loading }) => {
  const { handleSubmit, control } = useForm<FieldValues>({
    defaultValues: {
      tel: '',
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

        <LoadingButton text="Next" loading={loading} />
      </Stack>
    </form>
  );
};

export default Form;
