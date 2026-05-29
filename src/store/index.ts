import { configureStore } from '@reduxjs/toolkit';
import { gifteesReducer } from './gifteesSlice';

export const store = configureStore({
  reducer: {
    giftees: gifteesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
