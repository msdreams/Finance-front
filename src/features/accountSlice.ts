import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  addAccount, addTransfer, DataAddAccount, DataAddTransfer, getAccountByDefault, getAccountById, getAllAccounts, getAllTransfers, setAccountByDefault, updateAccount } from "../api/account";
import { AccountPut, GetAllAccounts, GetAllTransfers } from "../types/account";
import { DataAllTarget } from "../api/target";

type AuthState = {
  allTransfers: GetAllTransfers | null;
  allAccounts:GetAllAccounts | null;
  accountDefault: AccountPut | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  allTransfers:null,
  allAccounts: null,
  accountDefault: null,
  loading: false,
  error: null,
}

export const UpdateAccount = createAsyncThunk('account/UpdateAccount', async (id: string) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const response = await updateAccount(id, accessToken);

    return response
  }
})

export const SetAccountByDefault = createAsyncThunk('account/SetAccountByDefault', async (id: string) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const response = await setAccountByDefault(id, accessToken);

    return response
  }
})

export const AddTransfer = createAsyncThunk('account/AddTransfer', async (data: DataAddTransfer) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const response = await addTransfer(data, accessToken);

    return response
  }
})

export const AddAccount = createAsyncThunk('account/AddAccount', async (data: DataAddAccount) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const response = await addAccount(data, accessToken);

    return response
  }
})

export const fetchGetAllTransfers = createAsyncThunk('account/GetAllTransfers', async (data: DataAllTarget) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const response = await getAllTransfers(data, accessToken);

    return response
  }
})

export const fetchGetAllAccounts = createAsyncThunk('account/GetAllAccounts', async () => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const response = await getAllAccounts(accessToken);

    return response
  }
})

export const GetAccountById = createAsyncThunk('account/GetAccountById', async (id: string) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const response = await getAccountById(id, accessToken);

    return response
  }
})

export const GetAccountByDefault = createAsyncThunk('account/GetAccountByDefault', async () => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const response = await getAccountByDefault(accessToken);

    return response
  }
})

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    .addCase(UpdateAccount.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(UpdateAccount.pending, (state) => {
      state.loading = true;
    })
    .addCase(UpdateAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to UpdateAccount';
    })

    .addCase(SetAccountByDefault.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(SetAccountByDefault.pending, (state) => {
      state.loading = true;
    })
    .addCase(SetAccountByDefault.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to SetAccountByDefault';
    })

    .addCase(AddTransfer.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(AddTransfer.pending, (state) => {
      state.loading = true;
    })
    .addCase(AddTransfer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to AddTransfer';
    })

    .addCase(AddAccount.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(AddAccount.pending, (state) => {
      state.loading = true;
    })
    .addCase(AddAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to AddAccount';
    })

    .addCase(fetchGetAllTransfers.fulfilled, (state) => {
      state.loading = false;
    })
    .addCase(fetchGetAllTransfers.pending, (state, action) => {
      state.loading = true;
      state.allTransfers = action.payload ? action.payload : null; // Устанавливаем полученные категории расходов

    })
    .addCase(fetchGetAllTransfers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to GetAllTransfers';
    })

    .addCase(fetchGetAllAccounts.pending, (state) => {
      state.loading = false;
    })
    .addCase(fetchGetAllAccounts.fulfilled, (state, action) => {
      console.log("Accounts loaded into state:", action.payload); // Логируем, что приходят данные

      state.loading = true;
      state.allAccounts = action.payload ? action.payload : null; // Устанавливаем полученные категории расходов
    })
    .addCase(fetchGetAllAccounts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to GetAllTransfers';
    })
  },
})

export default accountSlice.reducer
