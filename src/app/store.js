import { configureStore } from '@reduxjs/toolkit';
import taskSlice from '../features/tasks';

export const store = configureStore({
  reducer: {
    tasks: taskSlice,
  },
});

