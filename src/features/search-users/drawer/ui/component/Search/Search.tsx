import SearchIcon from '@mui/icons-material/Search';
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from './ui/styled/StyledSearchComponent';

interface SearchChatProps {
  value: string;
  onSearchChange: (value: string) => void;
  handleKey: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const SearchChat: React.FC<SearchChatProps> = ({
  handleKey,
  onSearchChange,
  value,
}) => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={value}
        placeholder="Find user..."
        inputProps={{ 'aria-label': 'search' }}
        onKeyDown={(e) => handleKey(e)}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </Search>
  );
};

export default SearchChat;
