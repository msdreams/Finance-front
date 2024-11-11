import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SumsByDateArray, Transactions } from "../types/expenseIncomeTransaction";
import { DataAllIncome, DataAllIncomeForChartsDays, DataAllIncomeForChartsMY, DataUpdate, TransactionsAddExpense, TransactionsAddIncome, TransactionsAllExpense, TransactionsAllExpenseForChartsDays, TransactionsAllExpenseForChartsMY, TransactionsAllIncome, TransactionsAllIncomeForChartsDays, TransactionsAllIncomeForChartsMY, TransactionsDeleteExpense, TransactionsDeleteIncome, TransactionsUpdateExpense, TransactionsUpdateIncome } from "../api/expenseIncomeTransaction";

type AuthState = {
  allIncomes: Transactions | null;
  allIncomesMY: SumsByDateArray | null;
  allIncomesD: SumsByDateArray | null;
  allExpenses: Transactions | null;
  allExpensesMY: SumsByDateArray | null;
  allExpensesD: SumsByDateArray | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  allIncomes: null,
  allIncomesMY: null,
  allIncomesD: null,
  allExpenses: null,
  allExpensesMY: null,
  allExpensesD: null,
  loading: false,
  error: null,
};

export const fetchTransactionsUpdateIncome = createAsyncThunk(
  'expenseIncomeCategory/fetchTransactionsUpdateIncome',
  async ({id, data}: {id: string, data: DataUpdate}) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) throw new Error("Access token not found");

      const response = await TransactionsUpdateIncome(id, data, accessToken);
      return response;
    } catch (error) {
      throw new Error('Failed to fetch TransactionsUpdateIncome');
    }
  }
);

export const fetchTransactionsUpdateExpense = createAsyncThunk(
  'expenseIncomeCategory/fetchTransactionsUpdateExpense',
  async ({id, data}: {id: string, data: DataUpdate}) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) throw new Error("Access token not found");

      const response = await TransactionsUpdateExpense(id, data, accessToken);
      return response;
    } catch (error) {
      throw new Error('Failed to fetch TransactionsUpdateExpense');
    }
  }
);

export const fetchTransactionsAddIncome = createAsyncThunk(
  'expenseIncomeCategory/fetchTransactionsAddIncome',
  async (data: DataUpdate) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) throw new Error("Access token not found");

      const response = await TransactionsAddIncome(data, accessToken);
      return response;
    } catch (error) {
      throw new Error('Failed to fetch TransactionsAddIncome');
    }
  }
);

export const fetchTransactionsAddExpense = createAsyncThunk(
  'expenseIncomeCategory/fetchTransactionsAddExpense',
  async (data: DataUpdate) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) throw new Error("Access token not found");

      const response = await TransactionsAddExpense(data, accessToken);
      return response;
    } catch (error) {
      throw new Error('Failed to fetch TransactionsAddExpense');
    }
  }
);

// Запрос для получения всех доходов
export const fetchAllIncomes = createAsyncThunk(
  'expenseIncomeCategory/fetchAllIncomes',
  async (data: DataAllIncome) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) throw new Error("Access token not found");

      const response = await TransactionsAllIncome(data, accessToken);
      return response;
    } catch (error) {
      throw new Error('Failed to fetch incomes');
    }
  }
);

// Запрос для получения всех доходов для диаграмм (по месяцам и годам)
export const fetchAllIncomesForChartsMY = createAsyncThunk(
  'expenseIncomeCategory/fetchAllIncomesForChartsMY',
  async (data: DataAllIncomeForChartsMY) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) throw new Error("Access token not found");

      const response = await TransactionsAllIncomeForChartsMY(data, accessToken);
      return response;
    } catch (error) {
      throw new Error('Failed to fetch income charts (months/years)');
    }
  }
);

// Запрос для получения всех доходов для диаграмм (по дням)
export const fetchAllIncomesForChartsDays = createAsyncThunk(
  'expenseIncomeCategory/fetchAllIncomesForChartsDays',
  async (data: DataAllIncomeForChartsDays) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) throw new Error("Access token not found");

      const response = await TransactionsAllIncomeForChartsDays(data, accessToken);
      return response;
    } catch (error) {
      throw new Error('Failed to fetch income charts (days)');
    }
  }
);

// Запрос для получения всех расходов
export const fetchAllExpenses = createAsyncThunk(
  'expenseIncomeCategory/fetchAllExpenses',
  async (data: DataAllIncome) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) throw new Error("Access token not found");

      const response = await TransactionsAllExpense(data, accessToken);
      return response;
    } catch (error) {
      throw new Error('Failed to fetch expenses');
    }
  }
);

// Запрос для получения всех расходов для диаграмм (по месяцам и годам)
export const fetchAllExpensesForChartsMY = createAsyncThunk(
  'expenseIncomeCategory/fetchAllExpensesForChartsMY',
  async (data: DataAllIncomeForChartsMY) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) throw new Error("Access token not found");

      const response = await TransactionsAllExpenseForChartsMY(data, accessToken);
      return response;
    } catch (error) {
      throw new Error('Failed to fetch expense charts (months/years)');
    }
  }
);

// Запрос для получения всех расходов для диаграмм (по дням)
export const fetchAllExpensesForChartsDays = createAsyncThunk(
  'expenseIncomeCategory/fetchAllExpensesForChartsDays',
  async (data: DataAllIncomeForChartsDays) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) throw new Error("Access token not found");

      const response = await TransactionsAllExpenseForChartsDays(data, accessToken);
      return response;
    } catch (error) {
      throw new Error('Failed to fetch expense charts (days)');
    }
  }
);

export const fetchTransactionsDeleteIncome = createAsyncThunk(
  'expenseIncomeCategory/fetchTransactionsDeleteIncome',
  async (id: string) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) throw new Error("Access token not found");

      const response = await TransactionsDeleteIncome(id, accessToken);
      return response;
    } catch (error) {
      throw new Error('Failed to fetch TransactionsDeleteIncome');
    }
  }
)

export const fetchTransactionsDeleteExpense = createAsyncThunk(
  'expenseIncomeCategory/TransactionsDeleteExpense',
  async (id: string) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) throw new Error("Access token not found");

      const response = await TransactionsDeleteExpense(id, accessToken);
      return response;
    } catch (error) {
      throw new Error('Failed to fetch TransactionsDeleteExpense');
    }
  }
)

export const accountSlice = createSlice({
  name: 'expenseIncomeCategory',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    //fetchTransactionsUpdateIncome
    .addCase(fetchTransactionsUpdateIncome.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchTransactionsUpdateIncome.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(fetchTransactionsUpdateIncome.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch fetchTransactionsUpdateIncome';
    })

    //fetchTransactionsUpdateExpense
    .addCase(fetchTransactionsUpdateExpense.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchTransactionsUpdateExpense.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(fetchTransactionsUpdateExpense.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch fetchTransactionsUpdateExpense';
    })

    //fetchTransactionsAddExpense
    .addCase(fetchTransactionsAddExpense.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchTransactionsAddExpense.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(fetchTransactionsAddExpense.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch fetchTransactionsAddExpense';
    })

    //fetchTransactionsAddIncome
    .addCase(fetchTransactionsAddIncome.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchTransactionsAddIncome.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(fetchTransactionsAddIncome.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch fetchTransactionsAddIncome';
    })

      // --- Обработка запросов для всех доходов ---
      .addCase(fetchAllIncomes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllIncomes.fulfilled, (state, action) => {
        state.loading = false;
        state.allIncomes = action.payload;
      })
      .addCase(fetchAllIncomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch incomes';
      })

      // --- Обработка запросов для доходов по месяцам и годам ---
      .addCase(fetchAllIncomesForChartsMY.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllIncomesForChartsMY.fulfilled, (state, action) => {
        state.loading = false;
        state.allIncomesMY = action.payload;
      })
      .addCase(fetchAllIncomesForChartsMY.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch income charts (months/years)';
      })

      // --- Обработка запросов для доходов по дням ---
      .addCase(fetchAllIncomesForChartsDays.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllIncomesForChartsDays.fulfilled, (state, action) => {
        state.loading = false;
        state.allIncomesD = action.payload;
      })
      .addCase(fetchAllIncomesForChartsDays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch income charts (days)';
      })

      // --- Обработка запросов для всех расходов ---
      .addCase(fetchAllExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.allExpenses = action.payload;
      })
      .addCase(fetchAllExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch expenses';
      })

      // --- Обработка запросов для расходов по месяцам и годам ---
      .addCase(fetchAllExpensesForChartsMY.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllExpensesForChartsMY.fulfilled, (state, action) => {
        state.loading = false;
        state.allExpensesMY = action.payload;
      })
      .addCase(fetchAllExpensesForChartsMY.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch expense charts (months/years)';
      })

       //fetchAllExpensesForChartsDays
      .addCase(fetchAllExpensesForChartsDays.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllExpensesForChartsDays.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchAllExpensesForChartsDays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch fetchAllExpensesForChartsDays';
      })

       //fetchTransactionsDeleteIncome
      .addCase(fetchTransactionsDeleteIncome.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactionsDeleteIncome.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchTransactionsDeleteIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch fetchTransactionsDeleteIncome';
      })

       //fetchTransactionsDeleteExpense
      .addCase(fetchTransactionsDeleteExpense.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactionsDeleteExpense.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchTransactionsDeleteExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch fetchTransactionsDeleteExpense';
      })

  },

})

export default accountSlice.reducer