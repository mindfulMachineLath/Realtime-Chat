import React from 'react';
import styled from '@emotion/styled';
import { TextField } from '@mui/material';

const MuiInputStyled = styled(TextField)`
  & input {
    color: #ffffffa8;
  }

  & input::before {
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  }

  & label {
    color: #ffffffa8;
  }

  & fieldset {
    border-color: #ffffffa8;
  }
`;

interface InputTextProps {
  defaultValue?: string;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  label: string;
}

const InputText: React.FC<InputTextProps> = ({
  defaultValue,
  handleChange,
  label,
}) => {
  return (
    <MuiInputStyled
      label={label}
      defaultValue={defaultValue}
      variant="standard"
      sx={{ width: '80%' }}
      onChange={handleChange}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default InputText;
