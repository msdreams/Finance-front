import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  addAccount, addTransfer, DataAddAccount, DataAddTransfer, getAccountByDefault, getAccountById, getAllAccounts, getAllTransfers, setAccountByDefault, updateAccount } from "../api/account";
import { AccountPut } from "../types/account";
import { DataAllTarget } from "../api/target";

type AuthState = {
  accountDefault: AccountPut | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
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

export const GetAllTransfers = createAsyncThunk('account/GetAllTransfers', async (data: DataAllTarget) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const response = await getAllTransfers(data, accessToken);

    return response
  }
})

export const GetAllAccounts = createAsyncThunk('account/GetAllAccounts', async () => {
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
    // builder
    //   .addCase()
  },
})
