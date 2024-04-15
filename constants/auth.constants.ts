import { IControllerField, ISelectOptions } from '@/components/interfaces';
import { IErrorState } from '@/components/interfaces/auth.interfaces';
import { MembershipTypes } from '@/constants/user.constants';
import { IRegisterForm } from '@/screens/interfaces/register.interfaces';

export enum AuthStates {
  SUCCESS = 'SUCCESS',
  PENDING = 'PENDING',
  ERROR = 'ERROR',
}
export enum RegisterFieldValues {
  EMAIL = 'email',
  PASSWORD = 'password',
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
  IDENTIFICATION_NUMBER = 'identification_number',
  PHONE_NUMBER = 'phone_number',
  BIRTH_DATE = 'birth_date',
  MEMBERSHIP_TYPE = 'membership_type',
}
export enum RegisterFieldNames {
  EMAIL = 'Email',
  PASSWORD = 'Contraseña',
  FIRST_NAME = 'Nombre',
  LAST_NAME = 'Apellido',
  IDENTIFICATION_NUMBER = 'DNI',
  PHONE_NUMBER = 'Nro. Teléfono',
  BIRTH_DATE = 'Fecha de nacimiento',
  MEMBERSHIP_TYPE = 'Tipo de usuario',
}

export enum PasswordIconNames {
  EYE_CLOSED = 'eye-slash',
  EYE_OPEN = 'eye',
}

export const errorsState: IErrorState = {
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  phone_number: '',
  identification_number: '',
  birth_date: '',
  membership_type: '',
};

export const fields: IControllerField[] = [
  { field_value: RegisterFieldValues.EMAIL, field_name: RegisterFieldNames.EMAIL },
  { field_value: RegisterFieldValues.PASSWORD, field_name: RegisterFieldNames.PASSWORD },
  { field_value: RegisterFieldValues.FIRST_NAME, field_name: RegisterFieldNames.FIRST_NAME },
  { field_value: RegisterFieldValues.LAST_NAME, field_name: RegisterFieldNames.LAST_NAME },
  {
    field_value: RegisterFieldValues.IDENTIFICATION_NUMBER,
    field_name: RegisterFieldNames.IDENTIFICATION_NUMBER,
  },
  {
    field_value: RegisterFieldValues.PHONE_NUMBER,
    field_name: RegisterFieldNames.PHONE_NUMBER,
  },
  {
    field_value: RegisterFieldValues.MEMBERSHIP_TYPE,
    field_name: RegisterFieldNames.MEMBERSHIP_TYPE,
  },
  { field_value: RegisterFieldValues.BIRTH_DATE, field_name: RegisterFieldNames.BIRTH_DATE },
];

export const membershipTypes: ISelectOptions[] = [
  { label: MembershipTypes.ABONADO, value: MembershipTypes.ABONADO },
  { label: MembershipTypes.SOCIO, value: MembershipTypes.SOCIO },
  { label: MembershipTypes.NO_SOCIO, value: MembershipTypes.NO_SOCIO },
];

export const pickerMembershipTypeProps = {
  label: 'Seleccione tipo de usuario',
  value: null,
  color: '#737373',
};

export const registerFormData: IRegisterForm = {
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  phone_number: '',
  identification_number: '',
  birth_date: '',
  membership_type: '',
};

export const registerForm: IRegisterForm = {
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  identification_number: '',
  phone_number: '',
  birth_date: '',
  membership_type: '',
};

export const tokenRegExp = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
export const emailRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
export const phoneNumberRegExp = /^\d\d\d\d\d\d\d\d\d\d$/;
export const identificationNumberRegExp = /^\d\d\d\d\d\d\d\d$/;
