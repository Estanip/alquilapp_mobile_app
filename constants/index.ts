export enum SectionsTitles {
    HOME = 'Home',
    BOOKINGS = 'Mis Reservas',
    BOOK = 'Reservar',
    LOGOUT = 'Cerrar Sesión',
    LOGIN = 'Ingreso',
    REGISTER = 'Registro',
    EDIT_BOOK = 'Modificar Reserva',
    PASSWORD_RESET = 'Recuperar Contraseña',
}

export enum ButtonTextActions {
    EDIT = 'Editar',
    CONFIRM = 'Confirmar',
    CANCEL = 'Cancelar',
    REMOVE = 'Borrar',
    DETAILS = 'Detalles',
    BOOK = 'Reservar',
    BACK = 'Volver',
}

export enum Currencies {
    ARS = '$',
}

export const _formatStringToDate = (date: string) =>
    new Date(`${date.substring(6, 10)}-${date.substring(3, 5)}-${date.substring(0, 2)}T00:00:00`);

export enum TimeZones {
    ARG = 'America/Argentina/Buenos_Aires',
}
