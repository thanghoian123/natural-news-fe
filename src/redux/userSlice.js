import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, getUserAPI } from '../apis/userApi';

const initialState = {
  token: localStorage.getItem('token') || null,
  user: null,
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
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching user details
export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const response = await getUserAPI();
    return response; // This should be an array, so pick the first user if needed
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload?.[0] || null; // Store first user object
      });
  },
});

export const { setUser, setToken, logout, clearToken } = userSlice.actions;
export default userSlice.reducer;
