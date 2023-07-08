import React from 'react';
import { Box, IconButton, Popover } from '@mui/material';
import EmojiPicker, {
  EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  EmojiClickData,
  Emoji,
  SuggestionMode,
  SkinTonePickerLocation,
} from 'emoji-picker-react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

{
  /* <h2>Emoji Picker React 4 Demo</h2>
      <div className="show-emoji">
        Your selected Emoji is:
        {selectedEmoji ? (
          <Emoji
            unified={selectedEmoji}
            emojiStyle={EmojiStyle.APPLE}
            size={22}
          />
        ) : null}
      </div> */
}

const EmojiSet = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [selectedEmoji, setSelectedEmoji] = React.useState<string>('');

  console.log(selectedEmoji);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    setSelectedEmoji(emojiData.unified);
    console.log(emojiData);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton aria-label="delete" onMouseEnter={handlePopoverOpen}>
        <SentimentSatisfiedAltIcon color="primary" />
      </IconButton>
      <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box onMouseLeave={handlePopoverClose}>
          <EmojiPicker
            onEmojiClick={handleClick}
            autoFocusSearch={false}
            emojiStyle={EmojiStyle.APPLE}
          />
        </Box>
      </Popover>
    </>
  );
};

export default EmojiSet;
