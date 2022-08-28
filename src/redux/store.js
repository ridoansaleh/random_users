import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../redux/userSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer
  },
});
