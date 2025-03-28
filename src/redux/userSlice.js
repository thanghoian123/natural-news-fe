import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, getUserAPI } from '../apis/userApi';
import { get } from 'lodash';
const initialState = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  error: '',
};

// Async thunk for logging in
export const loginUser = createAsyncThunk(
  'user/login',
  async (email, { rejectWithValue, dispatch }) => {
    try {
      const response = await loginAPI(email);
      if (response?.access_token) {
        localStorage.setItem('token', response.access_token);

        // Fetch user data after login
        dispatch(fetchUser());

        return response.access_token;
      }
      throw new Error('Login failed');
    } catch (error) {
      console.error('Login Error:', error);
      return rejectWithValue(error?.response?.data?.detail || error.message || 'Login failed');
    }
  }
);

// Async thunk for fetching user details
export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const response = await getUserAPI();
    if (!response) throw new Error('User data not found');
    const user = get(response, '[0]');
    localStorage.setItem('user', JSON.stringify(user)); // Store user data
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
      state.error = '';

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login'; // Redirect to login page
    },
    clearError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        state.error = ''; // Clear errors on success
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload || 'Login failed';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = ''; // Clear errors on success
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch user';
      });
  },
});

export const { setUser, setToken, logout, clearError } = userSlice.actions;
export default userSlice.reducer;
