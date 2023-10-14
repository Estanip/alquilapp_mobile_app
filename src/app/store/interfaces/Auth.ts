export type UserI = {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    member_status: string;
    identification_number: string;
};

export type LoginPayloadI = {
    success: boolean;
    message: string;
    token: string;
    user: UserI;
};

export type RegisterPayloadI = {
    success: boolean;
    message: string;
};
