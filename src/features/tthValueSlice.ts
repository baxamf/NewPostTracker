import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

const initialState: string = "";

const tthValueSlice = createSlice({
  name: "tthValue",
  initialState,
  reducers: {
    setTthValue: (state, action: PayloadAction<string>) => action.payload,
  },
});

export const selectTthValue = (state: RootState) => state.tthValue;
export const { setTthValue } = tthValueSlice.actions;
export default tthValueSlice.reducer;
