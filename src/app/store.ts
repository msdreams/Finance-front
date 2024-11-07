import { configureStore } from '@reduxjs/toolkit';
import authReduser from '../features/authSlice'
import targetReduser from '../features/targetSlice';

export const store = configureStore({
  reducer: {
    auth: authReduser,
    target: targetReduser,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;