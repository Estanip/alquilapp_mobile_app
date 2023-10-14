export type RegisterFormI = {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    identification_number: string;
    birth_date: string;
    type_of_user: string;
};

export type ControllerFieldI = {
    value: string;
    name: string;
};

export type TypeOfUserOptionsI = {
    label: string;
    value: string;
};
