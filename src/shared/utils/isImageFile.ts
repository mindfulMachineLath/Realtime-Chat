export const isImageFile = (file: File | null) => {
  if (!file) {
    return false;
  }

  return file.type.includes('image');
};
