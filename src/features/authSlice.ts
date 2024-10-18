import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changePassword, createUser, LoginUser, UserResponse, UserResponseR } from "../api/users";
import Cookies from 'js-cookie'
import { userChangePassword, userRegister } from "../types/userRegister";

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

type LoginFormData = {
  userName: string;
  password: string;
};

export const loginUser = createAsyncThunk('auth/loginUser', async (formData: LoginFormData) => {
  const response = await LoginUser(formData);
  localStorage.setItem('accessToken', response.accessToken);

  const setCookie = (name: string, value: string, days?: number) => {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; secure; SameSite=Strict";
};

  setCookie('refreshToken', response.refreshToken, 7);

  return response;
});


export const registerUser = createAsyncThunk('auth/registerUser', async (formData: userRegister) => {
  const response: UserResponseR = await createUser(formData);
  return response;
});

export const changePasswordUser = createAsyncThunk('auth/changePasswordUser', async (formData: userChangePassword) => {
  const accessToken = localStorage.getItem('accessToken'); // Получите токен доступа

  if (!accessToken) {
    throw new Error('Access token is missing');
  }

  const response: UserResponseR = await changePassword(formData, accessToken); // Передаем токен в функцию

  return response;
});


export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async () => {
    const refreshToken = Cookies.get('refreshToken');

    if (!refreshToken) {
      throw new Error('No refresh token');
    }

    const expires = Cookies.get('refreshTokenExpires');
    const path = '/'
    console.log(refreshToken, path, expires);

    const response = await fetch('https://budgetapp.space/auth/refreshAccessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
      }),
    });

    const data = await response.json();

    localStorage.setItem('accessToken', data.accessToken);
    return data.accessToken;
  }
);


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem('accessToken');
      Cookies.remove('refreshToken', { path: '/auth/refreshAccessToken' });
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

    // change password
    builder.addCase(changePasswordUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

    builder.addCase(changePasswordUser.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload.message);
    })

    builder.addCase(changePasswordUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Registration failed';
    })

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