import { MembershipTypes } from '../../constants/user.constants';

export interface IRegisterForm {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    identification_number: string;
    phone_number: string;
    birth_date: string;
    membership_type: string;
    is_enabled?: boolean;
    is_membership_validated?: boolean;
}
