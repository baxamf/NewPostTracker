import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import historyReducer from "../features/historySlice";
import { newPostApi } from "../features/newPostApi";
import officesReducer from "../features/officesSlice";
import packageReducer from "../features/packageSlice";
import tthValueReducer from "../features/tthValueSlice";

export const store = configureStore({
  reducer: {
    tthValue: tthValueReducer,
    package: packageReducer,
    history: historyReducer,
    offices: officesReducer,
    counter: counterReducer,
    [newPostApi.reducerPath]: newPostApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newPostApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
