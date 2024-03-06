import { Style } from 'twrnc';

export type TAlertVariants = {
    default: Style;
    success: Style;
    warning: Style;
    error: Style;
};

export type TAlertIconVariants = {
    default: {
        light: string | undefined;
        dark: string | undefined;
    };
    error: {
        light: string | undefined;
        dark: string | undefined;
    };
    success: {
        light: string | undefined;
        dark: string | undefined;
    };
    warning: {
        light: string | undefined;
        dark: string | undefined;
    };
};
