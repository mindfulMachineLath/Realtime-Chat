import React from 'react';
import { Logout, Settings, AddAPhoto } from '@mui/icons-material';
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { auth, signOut } from 'firebase.config';
import { useAppDispatch, useLogOut, useAuthState } from 'shared/hook';
import uploadFiles from 'shared/lib/firebase/store/uploadFiles';
import { AlertMessages } from 'shared/ui';
import { setImage } from 'shared/store/reducers/UserSlice';
import { getFirestoreData } from 'shared/store/actions/uploadFirestoreFile';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();

  const logOutUser = useLogOut();

  const { photo, name } = useAuthState();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState<string | null>(photo);

  React.useEffect(() => {
    setImageUrl(photo);
  }, [photo]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => logOutUser())
      .catch(() => {
        setError(true);
      });
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];
    await uploadFiles({ file, setImg: setImageUrl });
    dispatch(setImage({ photo: imageUrl })); // update store!
  };

  return (
    <>
      <AlertMessages
        status={error}
        text="There was an error while signing out"
        severity="error"
      />

      <Tooltip title="Account settings" sx={{ pl: 0.2 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: '300px',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar src={imageUrl as string} />
          {name || 'Profile'}
        </MenuItem>

        <Divider />

        <MenuItem aria-label="upload picture" component="label">
          <ListItemIcon>
            <AddAPhoto fontSize="small" />
          </ListItemIcon>
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
          />
          Change foto
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default Profile;
