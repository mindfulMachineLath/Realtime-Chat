type FormValue = {
  country?: string;
  tel: string;
  name: string;
};

interface DataCountry {
  countries: Country[];
}

interface Country {
  name: string;
  emoji: string;
  phone: string;
}

interface CustomWindow extends Window {
  confirmationResult?: import('firebase/auth').ConfirmationResult;
  recaptchaVerifier?: import('firebase/auth').ApplicationVerifier;
}
