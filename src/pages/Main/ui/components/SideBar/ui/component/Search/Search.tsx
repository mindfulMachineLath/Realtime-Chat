import SearchIcon from '@mui/icons-material/Search';
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from './ui/styled/StyledSearchComponent';

interface SearchChatProps {
  value?: string;
  onSearchChange: (value: string) => void;
}

const SearchChat: React.FC<SearchChatProps> = ({ onSearchChange }) => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </Search>
  );
};

export default SearchChat;
