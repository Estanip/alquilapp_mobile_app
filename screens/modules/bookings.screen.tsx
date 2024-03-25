import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import {
    BookingDetailsSubtitles,
    TBookingDetails,
    _formatDateToString,
} from '../interfaces/bookings.interface';

import { TReservationPlayer, TReservations, TUser } from '@/api/interfaces/booking.interfaces';
import { BookingsService } from '@/api/modules/bookings.service';
import BookingCard from '@/components/modules/bookings/booking-card';
import { BookingStatus } from '@/constants/bookings.constants';
import { routes } from '@/constants/routes.constants';
import { showErrorAlert, showSuccessAlert } from '@/shared/alerts/toast.alert';
import { showAlert } from '@/shared/alerts/window.alert';
import { useSession } from '@/store/react.ctx';

export default function BookingsScreen(): React.JSX.Element {
    const { token, user_id } = useSession();
    useEffect(() => {
        if (!token) router.replace(routes.LOGIN);
    }, []);

    // Bookings data
    useEffect(() => {
        (async () => {
            try {
                const response = (await BookingsService().getByOwner(
                    token!,
                    user_id!,
                )) as TReservations;
                setReservations(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })();
    }, []);
    const [reservations, setReservations] = useState<TReservations>({
        active: [],
        inactive: [],
    });
    const [inactiveOpen, setInactiveOpen] = useState<boolean>(false);
    const [activeOpen, setActiveOpen] = useState<boolean>(false);

    // Cancel Booking
    const _cancelBooking = async (booking_id: string) => {
        const _remove = async (token: string, id: string) => {
            const response = await BookingsService().cancel(token, id);
            if (response?.statusCode === 200) {
                showSuccessAlert('Reserva cancelada con éxito');
                const reservations = (await BookingsService().getByOwner(
                    token!,
                    user_id!,
                )) as TReservations;
                setReservations(reservations);
            }
            if (response?.statusCode !== 200)
                return showErrorAlert('No se pudo cancelar la reserva');
        };

        showAlert(
            'Confirmación',
            '¿Quieres cancelar la reserva?',
            undefined,
            {
                active: true,
                message: 'Confirmar',
                return: () => _remove(token!, booking_id),
            },
            { active: true, message: 'Cancelar' },
        );
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ padding: 10 }}>
                <Pressable onPress={() => setActiveOpen(!activeOpen)}>
                    <Text style={{ marginBottom: 10, fontWeight: '700', fontSize: 20 }}>
                        {BookingStatus.ACTIVE}{' '}
                        {!activeOpen ? (
                            <AntDesign name="down" size={20} color="black" />
                        ) : (
                            <AntDesign name="up" size={20} color="black" />
                        )}
                    </Text>
                </Pressable>
                {activeOpen && reservations?.active?.length ? (
                    <>
                        {reservations.active.length
                            ? reservations.active.map((reservation, index) => (
                                  <BookingCard
                                      key={`active-${index}`}
                                      _cancelBooking={_cancelBooking}
                                      _status={BookingStatus.ACTIVE}
                                      _booking_id={reservation._id}
                                      _token={token as string}
                                      _infoDetails={
                                          [
                                              {
                                                  subtitle: BookingDetailsSubtitles.DATE,
                                                  text: _formatDateToString(
                                                      reservation.date as string,
                                                  ),
                                              },
                                              {
                                                  subtitle: BookingDetailsSubtitles.TIME,
                                                  text: reservation?.from,
                                              },
                                              {
                                                  subtitle: BookingDetailsSubtitles.COURT,
                                                  text: reservation?.court?.toString(),
                                              },
                                              {
                                                  subtitle: BookingDetailsSubtitles.PLAYERS,
                                                  playersText: reservation.players.length
                                                      ? reservation.players.map(
                                                            ({ user, fee }: TReservationPlayer) => {
                                                                const {
                                                                    first_name,
                                                                    last_name,
                                                                    membership_type,
                                                                } = user as TUser;
                                                                return {
                                                                    name: `${first_name} ${last_name}`,
                                                                    membership: membership_type,
                                                                    fee,
                                                                };
                                                            },
                                                        )
                                                      : [],
                                              },
                                              {
                                                  subtitle: BookingDetailsSubtitles.PRICE,
                                                  text: reservation?.total_price?.toString(),
                                              },
                                          ] as TBookingDetails
                                      }
                                      _editButton
                                      _cancelButton
                                  />
                              ))
                            : null}
                    </>
                ) : activeOpen && !reservations?.active?.length ? (
                    <View>
                        <TextInput>No hay reservas</TextInput>
                    </View>
                ) : null}
            </View>
            <View style={{ padding: 10 }}>
                <Pressable onPress={() => setInactiveOpen(!inactiveOpen)}>
                    <Text
                        style={{
                            marginBottom: 10,
                            fontWeight: '700',
                            fontSize: 20,
                        }}
                    >
                        {BookingStatus.INACTIVE}{' '}
                        {!inactiveOpen ? (
                            <AntDesign name="down" size={20} color="black" />
                        ) : (
                            <AntDesign name="up" size={20} color="black" />
                        )}
                    </Text>
                </Pressable>
                {inactiveOpen && reservations?.inactive?.length ? (
                    <>
                        {reservations.inactive.length
                            ? reservations.inactive.map((reservation, index) => (
                                  <BookingCard
                                      key={`inactive-${index}`}
                                      _cancelBooking={_cancelBooking}
                                      _token={token as string}
                                      _booking_id={reservation._id}
                                      _status={BookingStatus.INACTIVE}
                                      _infoDetails={
                                          [
                                              {
                                                  subtitle: BookingDetailsSubtitles.DATE,
                                                  text: _formatDateToString(
                                                      reservation.date as string,
                                                  ),
                                              },
                                              {
                                                  subtitle: BookingDetailsSubtitles.TIME,
                                                  text: reservation?.from,
                                              },
                                              {
                                                  subtitle: BookingDetailsSubtitles.COURT,
                                                  text: reservation?.court?.toString(),
                                              },
                                              {
                                                  subtitle: BookingDetailsSubtitles.PLAYERS,
                                                  playersText: reservation.players.length
                                                      ? reservation.players.map(({ user, fee }) => {
                                                            const {
                                                                first_name,
                                                                last_name,
                                                                membership_type,
                                                            } = user as TUser;
                                                            return {
                                                                name: `${first_name} ${last_name}`,
                                                                membership: membership_type,
                                                                fee,
                                                            };
                                                        })
                                                      : [],
                                              },
                                              {
                                                  subtitle: BookingDetailsSubtitles.PRICE,
                                                  text: reservation?.total_price?.toString(),
                                              },
                                          ] as TBookingDetails
                                      }
                                      _detailsButton
                                  />
                              ))
                            : null}
                    </>
                ) : inactiveOpen && !reservations?.inactive?.length ? (
                    <View>
                        <TextInput>No hay reservas</TextInput>
                    </View>
                ) : null}
            </View>
        </ScrollView>
    );
}
