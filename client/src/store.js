import { configureStore } from '@reduxjs/toolkit'
import auth from './store/auth';
import room from './store/room';
export const store = configureStore({
  reducer: {
      auth,
      room
  },
})