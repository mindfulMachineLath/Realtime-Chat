import { createAsyncThunk } from '@reduxjs/toolkit';
import uploadFiles from 'shared/lib/firebase/store/uploadFiles';

export const uploadFireStoreFile = createAsyncThunk(
  'upload/file',
  async (file: File, setImg: (url: string) => void) => {
    try {
      await uploadFiles({ file, setImg });
    } catch (err) {
      throw err;
      //   TODO: обработать здесь или пробросить дальше
    }
  }
);
