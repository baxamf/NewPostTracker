import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

const initialState: string = "";

const officesSlice = createSlice({
  name: "offices",
  initialState,
  reducers: {
    setCityValue: (state, action: PayloadAction<string>) => action.payload,
  },
});

export const selectOffices = (state: RootState) => state.offices;
export const { setCityValue } = officesSlice.actions;
export default officesSlice.reducer;
