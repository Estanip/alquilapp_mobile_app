import { IControllerField, ISelectOptions } from '../interfaces';

import { RegisterFieldNames, RegisterFieldValues } from '@/constants/auth.constants';
import { MembershipTypes } from '@/constants/user.constants';
import { IRegisterForm } from '@/screens/interfaces/register.interfaces';

export const errorsState: IRegisterForm = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    identification_number: '',
    birth_date: '',
    membership_type: '',
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
    { field_value: RegisterFieldValues.BIRTH_DATE, field_name: RegisterFieldNames.BIRTH_DATE },
    {
        field_value: RegisterFieldValues.MEMBERSHIP_TYPE,
        field_name: RegisterFieldNames.MEMBERSHIP_TYPE,
    },
];

export const membershipTypes: ISelectOptions[] = [
    { label: MembershipTypes.ABONADO, value: MembershipTypes.ABONADO },
    { label: MembershipTypes.SOCIO, value: MembershipTypes.SOCIO },
    { label: MembershipTypes.NO_SOCIO, value: MembershipTypes.NO_SOCIO },
];
