import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type InitilaState = string[];
const initialState: InitilaState = [];

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setHistory: (state, action: PayloadAction<InitilaState>) => action.payload,
    pushTth: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    },
    clearHistory: (state) => initialState,
  },
});

export const selectHistory = (state: RootState) => state.history;
export const { setHistory, pushTth, clearHistory } = historySlice.actions;
export default historySlice.reducer;
