import { Dispatch } from "@reduxjs/toolkit";
import { loginError, loginPending, loginSuccess } from "../store/modules/Auth";
import { LoginDispatchI } from "./interfaces/auth";

export const signIn =
  () =>
  async (dispatch: Dispatch<LoginDispatchI>): Promise<void> => {
    dispatch(loginPending());
    try {
      await fetch("http://localhost:80/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: "test@test.com",
          password: "Test12345",
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
        .then((response: any) => {
          console.log(response);
        });
    } catch (error: any) {
      console.log(error);
    }
  };
