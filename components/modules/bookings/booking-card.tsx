import React from 'react';
import { Text, View } from 'react-native';
import tailwind from 'twrnc';

import SharedButton from '../shared/button.component';
import { Card, CardContent, CardSubtitle, CardText } from '../shared/card';

import { IBookingCardProps } from '@/components/interfaces/booking.interfaces';
import { ButtonTextActions, Currencies, _formatStringToDate } from '@/constants';
import { routes } from '@/constants/routes.constants';
import { BookingStatus } from '@/screens/constants/bookings.constants';
import { BookingDetailsSubtitles, IBookingDetails } from '@/screens/interfaces/bookings.interface';
import { router } from 'expo-router';

export default function BookingCard({
    _cancelBooking,
    _booking_id,
    _status,
    _infoDetails,
    _editButton = false,
    _cancelButton = false,
    _detailsButton = false,
}: IBookingCardProps): any {
    const _cancel = () => _cancelBooking(_booking_id);

    const _edit = () =>
        router.navigate({
            pathname: routes.BOOK,
            params: { _id: _booking_id },
        });

    const _validateLimitDate = () => {
        const { text } = _infoDetails!.find(
            (e) => e.subtitle === BookingDetailsSubtitles.DATE,
        ) as IBookingDetails;
        const limitDate = _formatStringToDate(text).getTime();
        const currentDate = new Date().getTime();
        if (currentDate > limitDate) return false;
        else return true;
    };

    return (
        <View style={{ alignItems: 'center' }} key={_booking_id}>
            <Card style={tailwind`mt-2 w-90`}>
                <CardContent style={tailwind`gap-1`}>
                    {_infoDetails?.map(
                        ({ subtitle, text, playersText }: IBookingDetails, index) => (
                            <View key={`players-view-${index}`}>
                                {subtitle === BookingDetailsSubtitles.PLAYERS ? (
                                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardSubtitle style={tailwind`uppercase pb-2`}>
                                            {subtitle}:
                                        </CardSubtitle>
                                        {playersText?.map((e, i) => (
                                            <View
                                                key={`subtitle-${i}`}
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    paddingBottom: 4,
                                                }}
                                            >
                                                <CardText
                                                    style={tailwind`capitalize font-semibold`}
                                                >
                                                    {e.name}{' '}
                                                </CardText>
                                                <CardText>{e.membership} </CardText>
                                                <CardText>
                                                    ({Currencies.ARS} {e.fee})
                                                </CardText>
                                            </View>
                                        ))}
                                    </View>
                                ) : (
                                    <View
                                        style={{ display: 'flex', flexDirection: 'row' }}
                                        key={`general-view-${index}`}
                                    >
                                        {subtitle === BookingDetailsSubtitles.PRICE ? (
                                            <>
                                                <View
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        paddingTop: 15,
                                                    }}
                                                >
                                                    <CardSubtitle style={tailwind`uppercase`}>
                                                        {subtitle}:
                                                    </CardSubtitle>
                                                    <Text> </Text>
                                                    <CardText style={tailwind`font-semibold`}>
                                                        {Currencies.ARS} {text}
                                                    </CardText>
                                                </View>
                                            </>
                                        ) : (
                                            <>
                                                <CardSubtitle style={tailwind`uppercase`}>
                                                    {subtitle}:
                                                </CardSubtitle>
                                                <Text> </Text>
                                                <CardText>{text}</CardText>
                                            </>
                                        )}
                                    </View>
                                )}
                            </View>
                        ),
                    )}
                    <View
                        key={`buttons-active-view`}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        {_editButton && _status === BookingStatus.ACTIVE && _validateLimitDate() ? (
                            <SharedButton
                                _btnStyle={{ width: 150 }}
                                _buttonText={ButtonTextActions.EDIT}
                                _onClick={() => (_validateLimitDate() ? _edit() : null)}
                            />
                        ) : null}
                        {_cancelButton &&
                        _status === BookingStatus.ACTIVE &&
                        _validateLimitDate() ? (
                            <SharedButton
                                _btnStyle={{ width: 150, backgroundColor: 'red' }}
                                _buttonText={ButtonTextActions.CANCEL}
                                _onClick={() => (_validateLimitDate() ? _cancel() : null)}
                            />
                        ) : null}
                    </View>
                    {_detailsButton && _status === BookingStatus.INACTIVE ? (
                        <SharedButton
                            _buttonText={ButtonTextActions.DETAILS}
                            _onClick={() => null}
                            _btnStyle={{ alignSelf: 'center' }}
                        />
                    ) : null}
                </CardContent>
            </Card>
        </View>
    );
}
