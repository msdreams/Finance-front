import { configureStore } from '@reduxjs/toolkit';
import authReduser from '../features/authSlice'
import targetReduser from '../features/targetSlice';
import budgetReduser from '../features/budgetSlice';
import expenseIncomeCategoryReduser from '../features/expenseIncomeCategorySlice';
import expenseIncomeTransactionReduser from '../features/expenseIncomeTransactionSlice';
import accountReduser from '../features/accountSlice';

export const store = configureStore({
  reducer: {
    auth: authReduser,
    target: targetReduser,
    budget: budgetReduser,
    expenseIncomeCategory: expenseIncomeCategoryReduser,
    expenseIncomeTransaction: expenseIncomeTransactionReduser,
    account: accountReduser,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;