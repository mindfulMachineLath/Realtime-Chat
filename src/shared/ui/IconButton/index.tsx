import { IconButton } from '@mui/material';

interface ButtonIconProps {
  onClick: () => void;
  children: JSX.Element;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ onClick, children }) => {
  return (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={onClick}
      sx={{ mr: 2, display: { sm: 'none' } }}
    >
      {children}
    </IconButton>
  );
};

export default ButtonIcon;
