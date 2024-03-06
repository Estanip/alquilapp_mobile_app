import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import tailwind from 'twrnc';

import SharedButton from '../shared/button.component';
import { Card, CardContent, CardSubtitle, CardText } from '../shared/card';

import { IBookingCardProps } from '@/components/interfaces/booking.interfaces';
import { ButtonsTextVariants, Currencies } from '@/constants';
import { routes } from '@/constants/routes.constants';
import { BookingStatus } from '@/screens/constants/bookings.constants';
import { BookingDetailsSubtitles, IBookingDetails } from '@/screens/interfaces/bookings.interface';

export default function BookingCard({
    _cancelBooking,
    _booking_id,
    _status,
    _infoDetails,
    _editButton = false,
    _cancelButton = false,
    _detailsButton = false,
}: IBookingCardProps): any {
    return (
        <View style={{ alignItems: 'center' }} key={_booking_id}>
            <Card style={tailwind`w-full max-w-sm`}>
                <CardContent style={tailwind`gap-1`}>
                    {_infoDetails?.map(
                        ({ subtitle, text, playersText }: IBookingDetails, index) => (
                            <>
                                {subtitle === BookingDetailsSubtitles.PLAYERS ? (
                                    <View
                                        style={{ display: 'flex', flexDirection: 'column' }}
                                        key={`players-view-${index}`}
                                    >
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
                                                <CardSubtitle style={tailwind`uppercase`}>
                                                    {subtitle}:
                                                </CardSubtitle>
                                                <Text> </Text>
                                                <CardText style={tailwind`font-semibold`}>
                                                    {Currencies.ARS} {text}
                                                </CardText>
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
                            </>
                        ),
                    )}
                    <View
                        key={`buttons-active-view`}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}
                    >
                        {_editButton && _status === BookingStatus.ACTIVE ? (
                            <SharedButton
                                _btnStyle={{ width: 150 }}
                                _buttonText={ButtonsTextVariants.EDIT}
                                _onClick={() =>
                                    router.navigate({
                                        pathname: routes.BOOK,
                                        params: { _id: _booking_id },
                                    })
                                }
                            />
                        ) : null}
                        {_cancelButton && _status === BookingStatus.ACTIVE ? (
                            <SharedButton
                                _btnStyle={{ width: 150, backgroundColor: 'red' }}
                                _buttonText={ButtonsTextVariants.CANCEL}
                                _onClick={() => _cancelBooking(_booking_id)}
                            />
                        ) : null}
                    </View>
                    {_detailsButton && _status === BookingStatus.INACTIVE ? (
                        <SharedButton
                            _buttonText={ButtonsTextVariants.DETAILS}
                            _onClick={() =>
                                router.navigate({
                                    pathname: routes.BOOK,
                                    params: { _id: _booking_id },
                                })
                            }
                            _btnStyle={{ alignSelf: 'center' }}
                        />
                    ) : null}
                </CardContent>
            </Card>
        </View>
    );
}
