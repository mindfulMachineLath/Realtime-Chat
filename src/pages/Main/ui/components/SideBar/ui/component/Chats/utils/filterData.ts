import { MessageExample } from '../fakeData';

export const filterCountries = ({ data, search }: Filter) => {
  return data.filter((item) => {
    return item.primary.toLowerCase().includes(search.toLowerCase());
  });
};

interface Filter {
  data: MessageExample[]; // TODO: change
  search: string;
}
