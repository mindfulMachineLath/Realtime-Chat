type FormValue = {
  country: string;
  tel: string;
};

interface DataCountry {
  countries: Country[];
}

interface Country {
  name: string;
  emoji: string;
  phone: string;
}
