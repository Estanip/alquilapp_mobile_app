export interface AuthI {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  member_status: string;
  identification_number: string;
}

export interface AuthPayloadI {
  user?: AuthI;
  message?: string;
  token?: string;
}
