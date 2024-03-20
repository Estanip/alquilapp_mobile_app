import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, TextInputProps, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RNPickerSelect from 'react-native-picker-select';

import {
    _confirmBooking,
    _formatDate,
    _setSchdule,
    courtsPickerProps,
    initialDataState,
    initialStateSteps,
    schedulePickerProps,
} from './constants/book.constants';
import {
    IField,
    IMultiSelectField,
    IStep,
    StepStatus,
    SurfaceTypes_EN,
    SurfaceTypes_ES,
} from './interfaces/book.interfaces';
import { bookStyles, sharedStyles } from './styles';

import { IReservationResponse } from '@/api/interfaces/booking.interfaces';
import { ICourtResponse, TCourts } from '@/api/interfaces/court.interfaces';
import { BookService } from '@/api/modules/book.service';
import { CourtService } from '@/api/modules/court.service';
import { PlayersService } from '@/api/modules/players.service';
import CommonButton from '@/components/modules/shared/button.component';
import DatePicker from '@/components/modules/shared/datePicker.component';
import MultiSelectPicker from '@/components/modules/shared/multi-select.component';
import { ButtonTextActions } from '@/constants';
import { routes } from '@/constants/routes.constants';
import { INavigationParams, IRoute } from '@/interfaces';
import { showWarningAlert } from '@/shared/alerts/toast.alert';
import { useSession } from '@/store/react.ctx';

export default function BookScreen(): React.JSX.Element {
    // Params from navigate
    let params: INavigationParams;
    const route: IRoute = useRoute();
    if (route.params) params = route.params;
    // Loading
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Session
    const { token, user_id } = useSession();
    useEffect(() => {
        if (!token) router.replace(routes.LOGIN);
    }, []);

    // Fields data
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                let courts: TCourts = [];
                const response = await CourtService().get(token);
                if (response) courts = response as TCourts;
                setCourts(courts);
                const courtsField: IField[] = courts?.map((court) => {
                    return {
                        id: court.court_number.toString(),
                        value: court?.court_number.toString(),
                        label: `${court?.court_number} - ${court?.surface_type === SurfaceTypes_EN.HARD ? SurfaceTypes_ES.HARD : SurfaceTypes_ES.CLAY}`,
                    };
                });
                if (!params._id) {
                    _refreshFields();
                    setCourtsFieldsData(courtsField);
                } else if (params._id) {
                    setCourtsFieldsData(courtsField);
                    _setBookingById(params._id);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        })();
    }, []);
    const [courtsFieldsData, setCourtsFieldsData] = useState<IField[]>(
        initialDataState.courtNumbers,
    );
    const [availablesSchedulesFieldsData, setAvailablesSchedulesFieldsData] = useState<IField[]>(
        initialDataState.availableSchedules,
    );
    const [playersFieldsData, setPlayersFieldsData] = useState<IMultiSelectField[]>(
        initialDataState.players,
    );
    // Steps state
    const [steps, setSteps] = useState(initialStateSteps as IStep);

    // Court state
    const [courts, setCourts] = useState<TCourts>([]);
    const [courtNumber, setCourtNumber] = useState<string | null>(null);

    // Available schedules state
    const [schedule, setSchedule] = useState<string | null>(null);

    // Players state
    const [players, setPlayers] = useState<string[] | []>([]);

    // Date Time Picker
    const nextWeek = new Date().setDate(new Date().getDate() + 7);
    const [date, setDate] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Checkbox status
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const _getAvailbleSchedules = async (date: Date, reservationFrom?: string) => {
        let bookings;

        if (date && courtNumber) {
            const selectedCourtNumber = Number(courtNumber);
            bookings = await BookService().getByDateAndCourt(
                token!,
                selectedCourtNumber,
                date.toLocaleString('en-GB').substring(0, 10),
            );

            const selectedCourt = courts.find(
                (court) => court?.court_number === selectedCourtNumber,
            ) as ICourtResponse;

            if (selectedCourt) {
                const bookingsTimeFrom: number[] = [];
                if (bookings)
                    bookings.map((reservation) => {
                        if (reservation.from !== reservationFrom)
                            bookingsTimeFrom.push(parseInt(reservation.from.substring(0.2), 10));
                    });

                const courtAvailabilityFrom = parseInt(
                    selectedCourt?.available_from?.substring(0, 2),
                    10,
                );
                const courtAvailabilityTo = parseInt(
                    selectedCourt?.available_until?.substring(0, 2),
                    10,
                );

                const availableSchedules = _setSchdule(
                    bookingsTimeFrom,
                    courtAvailabilityFrom,
                    courtAvailabilityTo,
                    date,
                );

                const availableSchedulesFields: IField[] = availableSchedules.map((hour) => {
                    return {
                        id: hour.toString(),
                        value: `${hour}:00`,
                        label: `${hour}:00 hs`,
                    };
                });
                setAvailablesSchedulesFieldsData(availableSchedulesFields);
            }
        }
    };

    const _getPlayers = async () => {
        const players = await PlayersService().get(token);
        const playersFields: IMultiSelectField[] = [];
        if (players)
            for (const player of players) {
                if (player._id.toString() !== user_id?.toString()) {
                    playersFields.push({
                        id: player?._id,
                        name: player?.name,
                    });
                }
            }
        setPlayersFieldsData(playersFields);
    };

    const _filterPlayersSelection = (word: string) => {
        if (word === '') setPlayersFieldsData(playersFieldsData);
        else if (word?.length > 2)
            setPlayersFieldsData(playersFieldsData.filter((e) => e.name === word));
    };

    const _refreshFields = () => {
        setSteps({
            _court: StepStatus.PENDING,
            _date: StepStatus.PENDING,
            _schedule: StepStatus.PENDING,
            _players: StepStatus.PENDING,
        });
        _resetDataState(true);
    };

    const _resetDataState = (
        unsetCourt: boolean = false,
        unsetDate: boolean = false,
        unsetSchedule: boolean = false,
    ) => {
        if (unsetCourt) setCourtNumber(null);
        if (unsetDate) setDate(null);
        if (unsetSchedule) setSchedule(null);
        setPlayers([]);
        setIsChecked(false);
    };

    const _resetPlayersFields = () => setPlayersFieldsData(playersFieldsData);

    const _setBookingById = async (id: string) => {
        const reservation = await BookService().getById(token!, id);
        if (reservation) await _setExistingBooking(reservation);
    };

    const _setExistingBooking = async (reservation: IReservationResponse) => {
        setCourtNumber(reservation.court.toString());
        setDate(new Date(`${reservation.date}T00:00:00.000`));
        await _getAvailbleSchedules(new Date(reservation.date), reservation.from);
        setSchedule(reservation.from);
        _getPlayers();
        const currentPlayers = reservation.players.map((player) => player.user);
        reservation.players.map((player) => {
            if (player.user === user_id) setIsChecked(true);
        });
        onChangePlayers(currentPlayers, true);
        setSteps({
            _court: StepStatus.DONE,
            _date: StepStatus.DONE,
            _schedule: StepStatus.DONE,
            _players: StepStatus.DONE,
        });
    };

    const onChangeCheck = (isChecked: boolean) => {
        setIsLoading(true);
        let currentPlayers;
        if (isChecked && players.length < 4 && user_id) {
            currentPlayers = [...players, user_id?.toString()];
            setPlayers(currentPlayers);
            setIsChecked(true);
            if (currentPlayers.length >= 2 && currentPlayers.length <= 4)
                setSteps({ ...steps, _players: StepStatus.DONE });
            if (currentPlayers.length < 2) setSteps({ ...steps, _players: StepStatus.PENDING });
        } else if (!isChecked) {
            currentPlayers = players.filter((player) => player.toString() !== user_id?.toString());
            setPlayers(currentPlayers);
            setIsChecked(false);
            if (currentPlayers.length >= 2 && currentPlayers.length <= 4)
                setSteps({ ...steps, _players: StepStatus.DONE });
            else if (currentPlayers.length < 2)
                setSteps({ ...steps, _players: StepStatus.PENDING });
        }
        setIsLoading(false);
    };

    const onChangeCourt = (selectedCourt: string) => {
        if (!selectedCourt && Platform.OS !== 'ios') {
            _resetDataState(true, true, true);
            setSteps({
                _court: StepStatus.PENDING,
                _date: StepStatus.PENDING,
                _schedule: StepStatus.PENDING,
                _players: StepStatus.PENDING,
            });
        }
        if (selectedCourt) {
            _resetDataState(false, true, true);
            setCourtNumber(selectedCourt);
            setSteps({
                _court: StepStatus.DONE,
                _date: StepStatus.PENDING,
                _schedule: StepStatus.PENDING,
                _players: StepStatus.PENDING,
            });
        }
    };

    const onChangeDate = async (selectedDate: Date) => {
        setIsLoading(true);
        setSchedule(null);
        setShowDatePicker(false);
        await _getAvailbleSchedules(selectedDate);
        setDate(new Date(`${selectedDate.toISOString().substring(0, 10)}T00:00:00.000`));
        setSteps({
            ...steps,
            _date: StepStatus.DONE,
            _schedule: StepStatus.PENDING,
            _players: StepStatus.PENDING,
        });
        setIsLoading(false);
    };

    const onChangePlayers = (selectedPlayers: any, isEditing = false) => {
        setIsLoading(true);
        if (selectedPlayers.length === 5 && players.length === 4)
            return showWarningAlert('Máximo 4 jugadores');
        else if ((selectedPlayers.length === 4 && players.length === 3) || isEditing) {
            setPlayers(selectedPlayers);
            if (selectedPlayers.length >= 2 && selectedPlayers.length <= 4)
                setSteps({ ...steps, _players: StepStatus.DONE });
            else if (selectedPlayers.length < 2)
                setSteps({ ...steps, _players: StepStatus.PENDING });
        } else if (selectedPlayers.length < 4 && players.length <= 4) {
            setPlayers(selectedPlayers);
            if (selectedPlayers.length >= 2 && selectedPlayers.length <= 4)
                setSteps({ ...steps, _players: StepStatus.DONE });
            else if (selectedPlayers.length < 2)
                setSteps({ ...steps, _players: StepStatus.PENDING });
        }
        setIsLoading(false);
    };

    const onChangeSchedule = async (selectedSchedule: string | null) => {
        setIsLoading(true);
        if (!selectedSchedule) {
            _resetDataState();
            setSteps({ ...steps, _schedule: StepStatus.PENDING, _players: StepStatus.PENDING });
        }
        if (selectedSchedule) {
            _resetDataState();
            await _getPlayers();
            setSteps({
                ...steps,
                _players: StepStatus.PENDING,
                _schedule: StepStatus.DONE,
            });
            setSchedule(selectedSchedule);
        }
        setIsLoading(false);
    };

    return (
        <>
            {isLoading ? (
                <View style={sharedStyles.viewLoading}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <View key="View-container" style={bookStyles.view}>
                    <View
                        key="View-court-select"
                        style={{ ...bookStyles.viewPicker, marginBottom: 20, height: 50 }}
                    >
                        <RNPickerSelect
                            placeholder={courtsPickerProps(courtNumber!)}
                            useNativeAndroidPickerStyle={false}
                            textInputProps={{ style: { color: '#737373' } } as TextInputProps}
                            onValueChange={(value: string) => onChangeCourt(value)}
                            items={courtsFieldsData}
                            itemKey="id"
                            doneText="Seleccionar"
                        />
                    </View>

                    {steps._court === StepStatus.DONE && (
                        <View key="View-date-picker" style={{ marginBottom: 20 }}>
                            <DatePicker
                                _showDatePicker={showDatePicker}
                                _onChangeDate={(selectedDate: any) => onChangeDate(selectedDate!)}
                                _setShowDatePicker={() => setShowDatePicker(!showDatePicker)}
                                _onCancel={() => setShowDatePicker(false)}
                                _formatDate={_formatDate(date!)}
                                _maximumDate={new Date(nextWeek)}
                                _minimumDate={new Date()}
                                _date={date!}
                                _placeholderText="Fecha"
                            />
                        </View>
                    )}

                    {steps._date === StepStatus.DONE && (
                        <View
                            key="View-court-time"
                            style={{ ...bookStyles.viewPicker, marginBottom: 20, height: 50 }}
                        >
                            <RNPickerSelect
                                placeholder={schedulePickerProps(schedule!)}
                                useNativeAndroidPickerStyle={false}
                                textInputProps={{ style: { color: '#737373' } } as TextInputProps}
                                onValueChange={(value: string) => onChangeSchedule(value)}
                                items={availablesSchedulesFieldsData}
                                itemKey="id"
                                doneText="Seleccionar"
                            />
                        </View>
                    )}

                    {steps._schedule === StepStatus.DONE && (
                        <>
                            <View>
                                <BouncyCheckbox
                                    size={18}
                                    fillColor="#3498db"
                                    unfillColor="#FFFFFF"
                                    text="Soy parte de los jugadores"
                                    iconStyle={{ borderColor: '#3498db' }}
                                    innerIconStyle={{ borderWidth: 2 }}
                                    textStyle={{ textDecorationLine: 'none' }}
                                    style={{ paddingLeft: 2, marginBottom: 20 }}
                                    isChecked={isChecked}
                                    disableBuiltInState
                                    onPress={() => onChangeCheck(!isChecked)}
                                />
                            </View>

                            <View>
                                <MultiSelectPicker
                                    key="players-multi-select"
                                    _items={playersFieldsData}
                                    _onChangeInput={(word: string) => _filterPlayersSelection(word)}
                                    _onSelectedItemsChange={(items: any) => onChangePlayers(items)}
                                    _selectedItems={players}
                                    _resetFields={_resetPlayersFields}
                                />
                            </View>
                        </>
                    )}

                    {steps._players === StepStatus.DONE && (
                        <CommonButton
                            _btnStyle={{
                                position: 'absolute',
                                bottom: 20,
                                alignSelf: 'center',
                                width: 350,
                            }}
                            _buttonText={
                                route.params?._id ? ButtonTextActions.EDIT : ButtonTextActions.BOOK
                            }
                            _onClick={() =>
                                _confirmBooking(
                                    Number(courtNumber!),
                                    date!,
                                    schedule!,
                                    players,
                                    user_id!,
                                    token!,
                                    !!params?._id,
                                    params?._id,
                                )
                            }
                        />
                    )}
                </View>
            )}
        </>
    );
}
