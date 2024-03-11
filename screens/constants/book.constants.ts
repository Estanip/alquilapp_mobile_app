import { router } from 'expo-router';

import { IFieldsData, IStep, StepStatus } from '../interfaces/book.interfaces';

import { TToken } from '@/api/interfaces/auth.interfaces';
import { IBookRequest, IPlayer } from '@/api/interfaces/book.interfaces';
import { BookService } from '@/api/modules/book.service';
import { BookingsService } from '@/api/modules/bookings.service';
import { TDate } from '@/components/interfaces/auth.interfaces';
import { routes } from '@/constants/routes.constants';
import { showErrorAlert, showSuccessAlert, showWarningAlert } from '@/shared/alerts/toast.alert';
import { showAlert } from '@/shared/alerts/window.alert';

// STATES & PROPS
const initialScheduleState: number[] = [
    8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
];
export const initialStateSteps: IStep = {
    _date: StepStatus.PENDING,
    _court: StepStatus.PENDING,
    _schedule: StepStatus.PENDING,
    _players: StepStatus.PENDING,
};

export const initialDataState: IFieldsData = {
    courtNumbers: [],
    availableSchedules: [],
    players: [],
};

export const schedulePickerProps = (schedule: string | null) => {
    return {
        label: schedule ? `${schedule} hs` : 'Seleccione horario',
        value: schedule ? schedule : null,
        color: '#737373',
    };
};

// FUNCTIONS
export const _book = async (
    courtNumber: number,
    date: Date,
    schedule: string,
    players: string[],
    owner_id: string,
    token: TToken,
    editing: boolean,
    booking_id?: string,
) => {
    if (!courtNumber || !date || !schedule || players.length === 0)
        showWarningAlert('Datos incompletos');
    else {
        const playersList: IPlayer[] = players.map((player) => {
            return { user: player };
        });
        const bookRequest: IBookRequest = {
            date,
            court: courtNumber,
            from: schedule,
            players: playersList,
            owner_id,
        };
        const response = editing
            ? await BookingsService().edit(token!, bookRequest, booking_id!)
            : await BookService().book(token!, bookRequest);
        if (response?.success) {
            editing
                ? showSuccessAlert('Reserva editada con éxito')
                : showSuccessAlert('Reserva completada con éxito');
            router.navigate(routes.HOME);
        }
        if (!response?.success) return showErrorAlert('No se pudo confirmar la reserva');
    }
};

export const _confirmBooking = (
    courtNumber: number,
    date: Date,
    schedule: string,
    players: string[],
    owner_id: string,
    token: TToken,
    editing: boolean,
    booking_id?: string,
) => {
    showAlert(
        'Confirmación',
        '¿Quieres confirmar la reserva?',
        undefined,
        {
            active: true,
            message: 'Confirmar',
            return: () =>
                _book(courtNumber, date!, schedule!, players, owner_id, token, editing, booking_id),
        },
        { active: true, message: 'Cancelar' },
    );
};

export const _formatDate = (selectedDate: TDate | null, isDateSelected: boolean) => {
    if (isDateSelected && selectedDate) {
        const formatedDate = selectedDate?.toISOString();
        return `${formatedDate.substring(8, 10)}-${formatedDate.substring(5, 7)}-${formatedDate.substring(0, 4)}`;
    } else if (!isDateSelected) return 'Seleccione una fecha';
};

export const _setSchdule = (
    bookings: number[],
    courtAvailabitlyFrom: number,
    courtAvailabitlyTo: number,
    dateSelected: Date,
) => {
    let initialSchedule: number[] = [];
    initialScheduleState.map((hour) => {
        if (hour >= courtAvailabitlyFrom && hour <= courtAvailabitlyTo) initialSchedule.push(hour);
    });
    initialSchedule = initialSchedule.filter((hour) => !bookings.includes(hour));
    if (dateSelected.getDate() === new Date().getDate()) {
        const currentHour = new Date().getHours();
        const unavailableHours = initialScheduleState.filter((hour) => hour > currentHour);
        return initialSchedule.filter((hour) => unavailableHours.includes(hour));
    } else return initialSchedule;
};
