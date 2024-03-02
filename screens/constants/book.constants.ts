import { router } from 'expo-router';

import { IFieldsData, IStep, StepStatus } from '../interfaces/book.interfaces';

import { TToken } from '@/api/interfaces/auth.interfaces';
import { IBookRequest, IPlayer } from '@/api/interfaces/book.interfaces';
import { book } from '@/api/modules/book.service';
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

export const schedulePickerProps = {
    label: 'Seleccione horario',
    value: null,
    color: '#737373',
};

// FUNCTIONS
export const _book = async (
    courtNumber: number,
    date: Date,
    schedule: string,
    players: string[],
    token: TToken,
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
        };
        const response = await book(token, bookRequest);
        if (response?.success) {
            showSuccessAlert('Reserva completada con éxito');
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
    token: TToken,
) => {
    showAlert(
        'Confirmación',
        '¿Quieres confirmar la reserva?',
        { active: false, message: '', path: '' },
        {
            active: true,
            message: 'Confirmar',
            return: () => _book(courtNumber!, date!, schedule!, players, token),
        },
        { active: true, message: 'Cancelar' },
    );
};

export const _formatDate = (selectedDate: TDate | null, isDateSelected: boolean) => {
    if (isDateSelected) {
        let formatedDateToRender = selectedDate?.toLocaleString('en-GB', {
            timeZone: 'UTC',
        })!;
        formatedDateToRender = formatedDateToRender?.substring(0, 10);
        return formatedDateToRender;
    } else if (!isDateSelected) return 'Seleccione una fecha';
};

export const _setSchdule = (
    bookings: number[],
    courtAvailabitlyFrom: number,
    courtAvailabitlyTo: number,
) => {
    let initialSchedule: number[] = [];
    initialScheduleState.map((hour) => {
        if (hour >= courtAvailabitlyFrom && hour <= courtAvailabitlyTo) initialSchedule.push(hour);
    });
    initialSchedule = initialSchedule.filter((hour) => !bookings.includes(hour));
    return initialSchedule;
};
