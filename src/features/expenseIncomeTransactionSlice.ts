import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  account: | null;
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
