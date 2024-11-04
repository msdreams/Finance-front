import { createSlice } from "@reduxjs/toolkit";
import { AccountResponse } from "../api/account";

type AuthState = {
  account: AccountResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  account: null,
  loading: false,
  error: null,
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {

  },
  // extraReducers: {

  // },
})
