import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  users: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Fetch users from the mock API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:5000/users');
  return response.data;
});

// Add a new user to the mock API
export const addUser = createAsyncThunk('users/addUser', async (newUser) => {
  const response = await axios.post('http://localhost:5000/users', newUser);
  return response.data;
});

// Edit an existing user in the mock API
export const editUser = createAsyncThunk('users/editUser', async (updatedUser) => {
  const response = await axios.put(`http://localhost:5000/users/${updatedUser.id}`, updatedUser);
  return response.data;
});

// Delete a user from the mock API
export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
  await axios.delete(`http://localhost:5000/users/${userId}`);
  return userId;
});

// Enable or disable a user in the mock API
export const toggleUserEnabled = createAsyncThunk('users/toggleUserEnabled', async ({ id, enabled }) => {
  const response = await axios.patch(`http://localhost:5000/users/${id}`, { enabled });
  return response.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Synchronous action to reset the state
    resetUsers(state) {
      state.users = [];
      state.status = 'idle';
      state.error = null;
    },
    // Synchronous action to set loading state
    setLoading(state) {
      state.status = 'loading';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(toggleUserEnabled.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export const { resetUsers, setLoading } = userSlice.actions;
export default userSlice.reducer;