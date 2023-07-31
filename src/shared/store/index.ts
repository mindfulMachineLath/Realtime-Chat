import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import userReducer from './reducers/UserSlice';
import chatReducer from './reducers/ChatsSlice';

const rootReducer = combineReducers({
  userReducer,
  chatReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = AppState['dispatch'];

export * from './actions';
export * from './reducers';
export * from './selectors/root';
