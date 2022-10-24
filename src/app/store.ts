import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { dbApi } from "../features/dbApi";
import { newPostApi } from "../features/newPostApi";
import { authApi } from "../features/authApi";
import officesReducer from "../features/officesSlice";
import packageReducer from "../features/packageSlice";
import tthValueReducer from "../features/tthValueSlice";
import authReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tthValue: tthValueReducer,
    package: packageReducer,
    offices: officesReducer,
    counter: counterReducer,
    [authApi.reducerPath]: authApi.reducer,
    [newPostApi.reducerPath]: newPostApi.reducer,
    [dbApi.reducerPath]: dbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(newPostApi.middleware)
      .concat(dbApi.middleware)
      .concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
