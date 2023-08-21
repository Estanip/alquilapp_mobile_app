import { AuthI } from "../../store/interfaces/Auth";

export interface LoginDispatchI {
  type: string;
  payload?: {
    message?: string;
    succees?: boolean;
    token?: string;
    user?: AuthI;
  };
}
