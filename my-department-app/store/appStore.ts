import { configureStore } from '@reduxjs/toolkit';
import departmentReducer from './departmentSlice';

export const store = configureStore({
  reducer: {
    departments: departmentReducer,
  },
});

// types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
