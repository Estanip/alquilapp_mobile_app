export interface UserI {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  member_status: string;
  identification_number: string;
}

export interface LoginPayloadI {
  success: boolean;
  message: string;
  token: string;
  user: UserI;
}

export interface RegisterPayloadI {
  success: boolean;
  message: string;
}
