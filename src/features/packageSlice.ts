import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface PackageInitilaState {
  Status: string;
  CitySender: string;
  WarehouseSender: string;
  CityRecipient: string;
  WarehouseRecipient: string;
}

const initialState: PackageInitilaState = {
  Status: "",
  CitySender: "",
  WarehouseSender: "",
  CityRecipient: "",
  WarehouseRecipient: "",
};

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    setPackage: (state, action: PayloadAction<PackageInitilaState>) =>
      action.payload,
  },
});

export const selectPackage = (state: RootState) => state.package;
export const { setPackage } = packageSlice.actions;
export default packageSlice.reducer;
