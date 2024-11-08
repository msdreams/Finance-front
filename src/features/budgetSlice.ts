import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BudgetAdd } from "../types/budget";
import { addBudget, DataAddBudget, deleteBudget, getAllBudget, getTopLvlBudget } from "../api/budget";

type BudgetState = {
  budgets: BudgetAdd[] | null;
  budget: BudgetAdd | null;
  loading: boolean;
  error: string | null;
}

const initialState: BudgetState = {
  budgets: null,
  budget: null,
  loading: false,
  error: null,
}

export const AddBudget = createAsyncThunk('account/AddBudget', async (data: DataAddBudget) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const response = await addBudget(data, accessToken)

    return response;
  }
})

export const GetTopLvlBudget = createAsyncThunk('account/GetTopLvlBudget', async () => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const response = await getTopLvlBudget(accessToken)

    return response;
  }
})


export const GetAllBudgets = createAsyncThunk('account/GetAllBudgets', async () => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const response = await getAllBudget(accessToken)

    return response;
  }
})

export const DeleteBudget = createAsyncThunk('account/DeleteBudget', async (id: string) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const response = await deleteBudget(id, accessToken)

    return response;
  }
})


export const budgetSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      //addBudget
      .addCase(AddBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddBudget.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(AddBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create budget';
      })

      //getAllBudget
      .addCase(GetAllBudgets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAllBudgets.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(GetAllBudgets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch budgets';
      })

      //GetTopLvlBudget
      .addCase(GetTopLvlBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetTopLvlBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.budget = action.payload || null;
      })
      .addCase(GetTopLvlBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch top level budget';
      })

      //deleteBudget
      .addCase(DeleteBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteBudget.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(DeleteBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete budget';
      })
  },
})

export default budgetSlice.reducer;