import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataNewName, expenseDeleteCategory, expenseGetAllCategories, expenseUpdateCategory, incomeDeleteCategory, incomeGetAllCategories, incomeUpdateCategory } from "../api/expenseIncomeCategory";
import { DataAllTarget } from "../api/target";

type AuthState = {
  expenseIncomeCategory: | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  expenseIncomeCategory: null,
  loading: false,
  error: null,
}

export const IncomeUpdateCategory = createAsyncThunk(
  'expenseIncomeCategory/IncomeUpdateCategory', 
  async ({ id, data }: { id: string; data: DataNewName }) => {
    const accessToken = localStorage.getItem('accessToken'); // исправили вызов localStorage

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    try {
      const response = await incomeUpdateCategory(id, data, accessToken);
      return response;
    } catch (error) {
      throw new Error('Failed to update income category');
    }
  }
);

export const ExpenseUpdateCategory = createAsyncThunk(
  'expenseIncomeCategory/ExpenseUpdateCategory', 
  async ({ id, data }: { id: string; data: DataNewName }) => {
    const accessToken = localStorage.getItem('accessToken'); // исправили вызов localStorage

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    try {
      const response = await expenseUpdateCategory(id, data, accessToken);
      return response;
    } catch (error) {
      throw new Error('Failed to update expense category');
    }
  }
);

export const IncomeGetAllCategories = createAsyncThunk('expenseIncomeCategory/IncomeGetAllCategories', async (data: DataAllTarget) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    throw new Error("Access token not found");
  }

  try {
    const response = await incomeGetAllCategories(data, accessToken);
    return response;
  } catch (error) {
    throw new Error('Failed to IncomeGetAllCategories');
  }
})

export const ExpenseGetAllCategories = createAsyncThunk('expenseIncomeCategory/ExpenseGetAllCategories', async (data: DataAllTarget) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    throw new Error("Access token not found");
  }

  try {
    const response = await expenseGetAllCategories(data, accessToken);
    return response;
  } catch (error) {
    throw new Error('Failed to ExpenseGetAllCategories');
  }
})

export const IncomeDeleteCategory = createAsyncThunk('expenseIncomeCategory/IncomeDeleteCategory', async (id: string) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    throw new Error("Access token not found");
  }

  try {
    const response = await incomeDeleteCategory(id, accessToken);
    return response;
  } catch (error) {
    throw new Error('Failed to IncomeDeleteCategory');
  }
})


export const ExpenseDeleteCategory = createAsyncThunk('expenseIncomeCategory/ExpenseDeleteCategory', async (id: string) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    throw new Error("Access token not found");
  }

  try {
    const response = await expenseDeleteCategory(id, accessToken);
    return response;
  } catch (error) {
    throw new Error('Failed to ExpenseDeleteCategory');
  }
})


export const accountSlice = createSlice({
  name: 'expenseIncomeCategory',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {

  },
})
