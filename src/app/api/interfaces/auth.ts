import { LoginPayloadI, RegisterPayloadI } from "../../store/interfaces/Auth";

export interface LoginDispatchI {
  type: string;
  payload?: LoginPayloadI;
}

export interface RegisterDispatchI {
  type: string;
  payload?: RegisterPayloadI;
}
