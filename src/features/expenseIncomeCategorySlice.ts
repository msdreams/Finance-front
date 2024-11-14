import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataName, DataNewName, ExpenseAddCategory, expenseDeleteCategory, expenseGetAllCategories, expenseUpdateCategory, IncomeAddCategory, incomeDeleteCategory, incomeGetAllCategories, incomeUpdateCategory } from "../api/expenseIncomeCategory";
import { AllCategories } from "../types/expenseIncomeCategory";

type AuthState = {
  expenseCategoryAll: AllCategories | null;
  incomeCategoryAll: AllCategories | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  expenseCategoryAll: null,
  incomeCategoryAll: null,
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

export const fetchIncomeAddCategory = createAsyncThunk(
  'expenseIncomeCategory/fetchIncomeAddCategory', 
  async (data: DataName) => {
    const accessToken = localStorage.getItem('accessToken'); // исправили вызов localStorage

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    try {
      const response = await IncomeAddCategory(data, accessToken);
      return response;
    } catch (error) {
      throw new Error('Failed to update expense category');
    }
  }
);

export const fetchExpenseAddCategory = createAsyncThunk(
  'expenseIncomeCategory/fetchExpenseAddCategory', 
  async (data: DataName) => {
    const accessToken = localStorage.getItem('accessToken'); // исправили вызов localStorage

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    try {
      const response = await ExpenseAddCategory(data, accessToken);
      return response;
    } catch (error) {
      throw new Error('Failed to update expense category');
    }
  }
);

export const IncomeGetAllCategories = createAsyncThunk('expenseIncomeCategory/IncomeGetAllCategories', async () => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    throw new Error("Access token not found");
  }

  try {
    const response = await incomeGetAllCategories(accessToken);
    return response;
  } catch (error) {
    throw new Error('Failed to IncomeGetAllCategories');
  }
})

export const ExpenseGetAllCategories = createAsyncThunk('expenseIncomeCategory/ExpenseGetAllCategories', async () => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    throw new Error("Access token not found");
  }

  try {
    const response = await expenseGetAllCategories(accessToken);
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


export const expenseIncomeCategorySlice = createSlice({
  name: 'expenseIncomeCategory',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    .addCase(IncomeUpdateCategory.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(IncomeUpdateCategory.pending, (state) => {
      state.loading = true;
    })
    .addCase(IncomeUpdateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update income category';
    })

    .addCase(ExpenseUpdateCategory.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(ExpenseUpdateCategory.pending, (state) => {
      state.loading = true;
    })
    .addCase(ExpenseUpdateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update expense category';
    })

    .addCase(fetchIncomeAddCategory.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(fetchIncomeAddCategory.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchIncomeAddCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update expense category';
    })

    .addCase(fetchExpenseAddCategory.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(fetchExpenseAddCategory.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchExpenseAddCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update expense category';
    })

    // --- Обработка успешного ответа на запрос получения всех категорий доходов ---
    .addCase(IncomeGetAllCategories.pending, (state) => {
      state.loading = true; // Начинаем загрузку
    })
    .addCase(IncomeGetAllCategories.fulfilled, (state, action) => {
      state.loading = false; // Загрузка завершена
      state.incomeCategoryAll = action.payload; // Устанавливаем полученные категории доходов
    })
    .addCase(IncomeGetAllCategories.rejected, (state, action) => {
      state.loading = false; // Завершаем загрузку
      state.error = action.error.message || 'Failed to load income categories'; // Устанавливаем ошибку
    })

    // --- Обработка успешного ответа на запрос получения всех категорий расходов ---
    .addCase(ExpenseGetAllCategories.pending, (state) => {
      state.loading = true; // Начинаем загрузку
    })
    .addCase(ExpenseGetAllCategories.fulfilled, (state, action) => {
      state.loading = false; // Загрузка завершена
      state.expenseCategoryAll = action.payload; // Устанавливаем полученные категории расходов
    })
    .addCase(ExpenseGetAllCategories.rejected, (state, action) => {
      state.loading = false; // Завершаем загрузку
      state.error = action.error.message || 'Failed to load expense categories'; // Устанавливаем ошибку
    })
  }
  
})
export default expenseIncomeCategorySlice.reducer