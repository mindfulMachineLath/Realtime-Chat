import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import s from './Input.module.scss';

const Input: React.FC = () => {
  return (
    <Box className={s.send_box}>
      <TextField
        className={s.send_input}
        id="input-message"
        placeholder="message"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SentimentSatisfiedAltIcon />
            </InputAdornment>
          ),
        }}
        // variant="standard"
      />

      <IconButton aria-label="delete">
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default Input;
