import { MessageExample } from '../Chats';

export const filterCountries = ({ data, search }: Filter) => {
  return data.filter((item) => {
    return item.primary.toLowerCase().includes(search.toLowerCase());
  });
};

interface Filter {
  data: MessageExample[]; // TODO: change
  search: string;
}
