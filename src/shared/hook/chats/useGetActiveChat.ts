import { useAppSelector } from '../redux';

export const useGetActiveChat = () => {
  const { user, chatID, currentUserID } = useAppSelector(
    (state) => state.chatReducer
  );

  return {
    user,
    chatID,
    currentUserID,
  };
};
