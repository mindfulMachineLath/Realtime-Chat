import React from 'react';
import styles from './Home.module.scss';
import {
  Button,
  Typography,
  TextField,
  MenuItem,
  InputAdornment,
  Stack,
  // styled,
  // ButtonProps,
  SelectChangeEvent,
} from '@mui/material';
import { purple } from '@mui/material/colors';
import { useForm } from 'react-hook-form';
import { useQuery } from '@apollo/client';
import { GET_COUNTRY } from 'shared/const';
import Select from './Select/Select';

// const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
//   color: theme.palette.getContrastText(purple[500]),
//   backgroundColor: purple[500],
//   '&:hover': {
//     backgroundColor: purple[700],
//   },
// })); // TODO: кастомизированная кнопка

type FormValue = {
  country: string;
  tel: string;
};

export interface DataCountry {
  countries: [{ name: string; emoji: string; phone: string }];
}

const Home: React.FC = () => {
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

  // TODO: add loading
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
                className={styles.input}
                label={errors.tel?.message || 'Phone Number'}
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
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
