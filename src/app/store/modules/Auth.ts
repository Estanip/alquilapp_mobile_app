import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthI, AuthPayloadI } from "../interfaces/Auth";

interface AuthState {
  status: "Success" | "Pending" | "Error";
  error: Error | string | null;
  user: AuthI | null;
}

const initialState: AuthState = {
  status: "Pending",
  error: null,
  user: null,
};

const AuthSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginPending: (state: AuthState) => {
      state.status = "Pending";
      state.error = null;
      state.user = null;
    },
    loginSuccess: (state: AuthState, action: PayloadAction<AuthPayloadI>) => {
      state.status = "Success";
      state.error = null;
      state.user = action.payload.user as AuthI;
      localStorage.setItem("user_id", action.payload.user?.id as string);
      localStorage.setItem("token", action.payload.token as string);
    },
    loginError: (state: AuthState, action: PayloadAction<AuthPayloadI>) => {
      state.status = "Error";
      state.user = null;
      state.error = action.payload.message as string;
    },
  },
});

export const { loginSuccess, loginError, loginPending } = AuthSlice.actions;
export default AuthSlice.reducer;
