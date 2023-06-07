import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import { UseFormRegisterReturn } from 'react-hook-form';
import { MenuProps } from './style';

interface SelectProps {
  register?: UseFormRegisterReturn;
  data?: DataCountry;
}

const Select: React.FC<SelectProps> = ({ register, data }) => {
  return (
    <TextField
      {...register}
      color="secondary"
      id="outlined-select-currency"
      select
      label="Country"
      defaultValue="7"
      fullWidth
      SelectProps={{ MenuProps: MenuProps }}
    >
      {data?.countries.map((country) => (
        <MenuItem key={country.name} value={country.phone}>
          {country.name} +
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Select;
