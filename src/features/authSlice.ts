import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, LoginUser, UserResponse, UserResponseR } from "../api/users";
import Cookies from 'js-cookie'
import { userRegister } from "../types/userRegister";

type AuthState = {
  user: UserResponse | null;
  loading: boolean;
  error: string | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  accessToken: localStorage.getItem('accessToken'),
}

type FormData = {
  email: string;
  password: string;
};

export const loginUser = createAsyncThunk('auth/loginUser', async (formData: FormData) => {
  const response = await LoginUser(formData);
  localStorage.setItem('accessToken', response.accessToken);
  Cookies.set('refreshToken', response.refreshToken, {expires: 7});

  return response;
})

export const registerUser = createAsyncThunk('auth/registerUser', async (formData: userRegister) => {
  const response: UserResponseR = await createUser(formData);
  return response;
});

export const refreshAccessToken = createAsyncThunk('auth/refreshAccessToken', async () => {
  const refreshToken = Cookies.get('refreshToken');
  if (!refreshToken) {
    throw new Error('No refresh token avaiable');
  };

  const response = await fetch('/auth/refresh-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  const data = await response.json();
  localStorage.setItem('accessToken', data.accessToken);
  return data.accessToken;
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem('accessToken');
      Cookies.remove('refreshToken');
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.accessToken = action.payload.accessToken;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Login failed';
    });

    // register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload.message);
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Registration failed';
    });

    // token
    builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
      state.accessToken = action.payload;
    });
    builder.addCase(refreshAccessToken.rejected, (state) => {
      state.error = 'Failed to refresh access token';
    });
  }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;