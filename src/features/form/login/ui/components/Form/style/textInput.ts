import styled from '@emotion/styled';
import { TextField } from '@mui/material';

export const MuiInputStyled = styled(TextField)`
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
