import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../redux/userSlice'

export const setupStore = preloadedState => {
  return configureStore({
    reducer: {
      users: usersReducer
    },
    preloadedState
  })
}
