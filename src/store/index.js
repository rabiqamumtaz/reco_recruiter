import { configureStore } from '@reduxjs/toolkit';
import recruiterAuthReducer from './recruiterAuthSlice';

const store = configureStore({
  reducer: {
    recruiterAuth: recruiterAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;