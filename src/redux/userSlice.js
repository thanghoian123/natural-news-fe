import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, verifyOtpAPI, getUserAPI } from '../apis/userApi';
import { get } from 'lodash';

const initialState = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  otpSent: false,
  error: '',
  loading: false, // ← Add this
};

// Async thunk for logging in (sends OTP)
export const loginUser = createAsyncThunk('user/login', async (email, { rejectWithValue }) => {
  try {
    const response = await loginAPI(email);
    if (response.status === 200) {
      return true; // Indicating OTP was sent
    }
  } catch (error) {
    console.error('Login Error:', error);
    return rejectWithValue(error?.response?.data?.detail || error.message || 'Failed to send OTP');
  }
});

// Async thunk for verifying OTP
export const verifyOtp = createAsyncThunk(
  'user/verifyOtp',
  async ({ email, otp }, { rejectWithValue, dispatch }) => {
    try {
      const response = await verifyOtpAPI(email, otp);
      if (response?.access_token) {
        localStorage.setItem('token', response.access_token);
        dispatch(fetchUser()); // Fetch user after getting the token
        return response.access_token;
      }
      throw new Error('OTP verification failed');
    } catch (error) {
      console.error('OTP Verification Error:', error);
      return rejectWithValue(
        error?.response?.data?.detail || error.message || 'OTP verification failed'
      );
    }
  }
);

// Async thunk for fetching user details
export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const response = await getUserAPI();
    if (!response) throw new Error('User data not found');
    const user = get(response, '[0]');
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    console.error('Fetch User Error:', error);
    return rejectWithValue(error.message || 'Failed to fetch user data');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.otpSent = false;
      state.error = '';

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    },
    clearError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.otpSent = true;
        state.loading = false;
        state.error = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to send OTP';
      })

      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.token = action.payload;
        state.otpSent = false;
        state.loading = false;
        state.error = '';
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'OTP verification failed';
      })

      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = '';
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch user';
      });
  },
});

export const { setUser, setToken, logout, clearError } = userSlice.actions;
export default userSlice.reducer;
