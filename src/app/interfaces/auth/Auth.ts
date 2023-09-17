export interface RegisterFormI {
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  identification_number?: string;
  birth_date?: string;
  type_of_user?: string;
}

export interface ControllerFieldI {
  value?: string;
  name?: string;
}

export interface TypesOfUserI {
  label: string;
  value: string;
}
