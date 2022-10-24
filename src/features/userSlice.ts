import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./authApi";
import type { RootState } from "../app/store";

type AuthState = {
  user: User | null;
  token: string | null;
};

const initialState = { user: null, token: null } as AuthState;

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, accessToken },
      }: PayloadAction<{ user: User; accessToken: string }>
    ) => {
      state.user = user;
      state.token = accessToken;
    },
    resetUser: () => ({ user: null, token: null }),
  },
});

export const { setCredentials, resetUser } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
