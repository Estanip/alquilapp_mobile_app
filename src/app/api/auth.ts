import { Dispatch } from "@reduxjs/toolkit";
import { loginError, loginPending, loginSuccess } from "../store/modules/Auth";
import { LoginDispatchI } from "./interfaces/Auth";
import { RegisterFormI } from "../interfaces/auth/Auth";

export const signIn =
  (email: string, password: string) =>
  async (dispatch: Dispatch<LoginDispatchI>): Promise<void> => {
    dispatch(loginPending());
    try {
      await fetch("http://localhost:80/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          if (response?.success) dispatch(loginSuccess(response));
          else if (!response?.success) dispatch(loginError(response));
        });
    } catch (error: any) {
      dispatch(loginError(error));
    }
  };

export const signUp =
  (user: RegisterFormI) =>
  async (dispatch: Dispatch<LoginDispatchI>): Promise<void> => {
    dispatch(loginPending());
    try {
      await fetch("http://192.168.1.6:80/auth/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          if (response?.success) dispatch(loginSuccess(response));
          else if (!response?.success) dispatch(loginError(response));
        });
    } catch (error: any) {
      dispatch(loginError(error));
    }
  };

export const checkToken =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(loginPending());
    try {
      await fetch("http://localhost:80/court", {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("token") as string,
        },
      })
        .then((res) => res.json())
        .then((response: any) => {});
    } catch (error: any) {
      console.log(error);
    }
  };
