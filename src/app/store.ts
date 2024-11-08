import { configureStore } from '@reduxjs/toolkit';
import authReduser from '../features/authSlice'
import targetReduser from '../features/targetSlice';
import budgetReduser from '../features/budgetSlice';

export const store = configureStore({
  reducer: {
    auth: authReduser,
    target: targetReduser,
    budget: budgetReduser,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;