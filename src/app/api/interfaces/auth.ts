import { type LoginPayloadI, type RegisterPayloadI } from '../../store/interfaces/Auth';

export type LoginDispatchI = {
    type: string;
    payload?: LoginPayloadI;
};

export type RegisterDispatchI = {
    type: string;
    payload?: RegisterPayloadI;
};
