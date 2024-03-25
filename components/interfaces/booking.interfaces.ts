import { BookingStatus } from '@/constants/bookings.constants';
import { IBookingDetails } from '@/screens/interfaces/bookings.interface';

export interface IBookingCardProps {
    _cancelBooking: (arg: string) => any;
    _booking_id: string;
    _token: string;
    _status?: BookingStatus;
    _infoDetails?: IBookingDetails[];
    _texts?: string[];
    _editButton?: boolean;
    _cancelButton?: boolean;
    _detailsButton?: boolean;
}
