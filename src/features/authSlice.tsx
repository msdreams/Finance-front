import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changePassword, createUser, ForgotPassword, LoginUser, UserResponse, UserResponseCh, UserResponseR } from "../api/users";
import Cookies from 'js-cookie'
import { ForgotPasswordType, userChangePassword, userRegister } from "../types/userRegister";

type AuthState = {
  user: UserResponse | null;
  loading: boolean;
  error: string | null;
  accessToken: string | null;
  message: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  accessToken: localStorage.getItem('accessToken'),
  message: null,
}

type LoginFormData = 
  | { email: string; password: string }
  | { phoneNumber: string; password: string };

export const loginUser = createAsyncThunk('auth/loginUser', async (formData: LoginFormData) => {
    const response = await LoginUser(formData);

    if (!response?.accessToken || !response?.refreshToken) {
      throw new Error('Invalid response: missing tokens');
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('accessToken', response.accessToken);
    }

    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 7);

    Cookies.set('refreshToken', response.refreshToken, {
      expires: expiresDate,
      path: '/',
      domain: '.budgetapp.space',
      secure: true,
      sameSite: 'None',
    });

    return response;
});

export const registerUser = createAsyncThunk('auth/registerUser', async (formData: userRegister, { rejectWithValue }) => {
    const response: UserResponseR = await createUser(formData);
    return response;
});

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (formData: ForgotPasswordType) => {
  const response = ForgotPassword(formData);
  return response;
})

export const changePasswordUser = createAsyncThunk('auth/changePasswordUser', async (formData: userChangePassword) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    throw new Error('Access token is missing');
  }

  const response: UserResponseCh = await changePassword(formData, accessToken);

  return response;
});

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async () => {
    const refreshToken = Cookies.get('refreshToken');

    if (!refreshToken) {
      throw new Error('No refresh token');
    }

    const response = await fetch('https://budgetapp.space/auth/refreshAccessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

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
      Cookies.remove('refreshToken', { path: '/', domain: '.budgetapp.space' });
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.accessToken = action.payload.accessToken;
      console.log(action.payload.accessToken)

    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Login failed';
    });

    // register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.response;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Registration failed';
      console.log(action.error.message)
    });

    //forgot password
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    })

    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.response;
    })

    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'forgorPassword failed';
    })

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