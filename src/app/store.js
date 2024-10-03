import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import bookingReducer from '../features/booking/bookingSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    bookings: bookingReducer,
    auth: authReducer,
  },
});