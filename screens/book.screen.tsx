import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, TextInput, TextInputProps, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RNPickerSelect from 'react-native-picker-select';

import {
    _confirmBooking,
    _formatDate,
    _setSchdule,
    initialDataState,
    initialStateSteps,
    schedulePickerProps,
} from './constants/book.constants';
import {
    IField,
    IFieldsData,
    IMultiSelectField,
    IStep,
    StepStatus,
    SurfaceTypes,
} from './interfaces/book.interfaces';
import { bookStyles, pickerCourts } from './styles';

import { ICourt, TCourts } from '@/api/interfaces/court.interfaces';
import { getBookingsByDateAndCourt, getCourts, getPlayers } from '@/api/modules/book.service';
import { TDate, TDateTimePickerModes } from '@/components/interfaces/auth.interfaces';
import SharedButton from '@/components/modules/shared/button.component';
import MultiSelectPicker from '@/components/modules/shared/multi-select.component';
import { routes } from '@/constants/routes.constants';
import { showWarningAlert } from '@/shared/alerts/toast.alert';
import { useSession } from '@/store/react.ctx';

export default function BookScreen(): React.JSX.Element {
    // Session
    const { token, user_id } = useSession();
    useEffect(() => {
        if (!token) router.replace(routes.LOGIN);
    }, []);

    // Fields data
    useEffect(() => {
        (async () => {
            try {
                let courts: TCourts = [];
                const response = await getCourts(token);
                if (response) courts = response as TCourts;
                setCourts(courts);
                const courtsField: IField[] = courts?.map((court) => {
                    return {
                        label: `${court?.court_number} - ${court?.surface_type === SurfaceTypes.HARD ? 'Cemento' : 'Polvo de Ladrillo'}`,
                        value: court?.court_number,
                        id: court?._id,
                    };
                });
                _refreshFields();
                setFieldsData({
                    courtNumbers: courtsField,
                    availableSchedules: [],
                    players: [],
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })();
    }, []);
    const [fieldsData, setFieldsData] = useState<IFieldsData>(initialDataState);

    // Steps state
    const [steps, setSteps] = useState(initialStateSteps as IStep);

    // Court state
    const [courts, setCourts] = useState<TCourts>([]);
    const [courtNumber, setCourtNumber] = useState<number | null>(null);

    // Available schedules state
    const [schedule, setSchedule] = useState<string | null>(null);

    // Players state
    const [players, setPlayers] = useState<string[] | []>([]);
    const [playersFields, setPlayersFields] = useState<IMultiSelectField[] | []>([]);

    // Date Time Picker
    const nextWeek = new Date().setDate(new Date().getDate() + 7);
    const [date, setDate] = useState<TDate | null>(null);
    const [isDateSelected, setDateSelected] = useState<boolean>(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [displaymode, setMode] = useState<TDateTimePickerModes>('date');

    const _getAvailbleSchedules = async (date: Date) => {
        let bookings;
        if (date && courtNumber) {
            bookings = await getBookingsByDateAndCourt(token, courtNumber, date);
            const selectedCourt: ICourt | undefined = courts.find(
                (court) => court?.court_number === courtNumber,
            );
            if (selectedCourt) {
                let bookingsTimeFrom: number[] = [];
                if (bookings)
                    bookingsTimeFrom = bookings.map((reservation) =>
                        parseInt(reservation?.from?.substring(0.2), 10),
                    );
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
                );

                const availableSchedulesFields: IField[] = availableSchedules.map((hour) => {
                    return {
                        id: hour.toString(),
                        value: `${hour}:00`,
                        label: `${hour}:00 hs`,
                    };
                });
                setFieldsData({
                    ...fieldsData,
                    availableSchedules: availableSchedulesFields,
                });
            }
        }
    };
    const _getPlayers = async () => {
        const players = await getPlayers(token);
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
        setFieldsData({
            ...fieldsData,
            players: playersFields,
        });
        setPlayersFields(playersFields);
    };
    const _displayDatepicker = (mode: TDateTimePickerModes) => {
        setMode(mode);
        setShowDatePicker(true);
    };
    const _filterPlayersSelection = (word: string) => {
        if (word === '')
            setFieldsData({
                ...fieldsData,
                players: playersFields,
            });
        else if (word?.length > 2)
            setFieldsData({
                ...fieldsData,
                players: fieldsData.players.filter((e) => e.name === word),
            });
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
        court: boolean = false,
        date: boolean = false,
        schedule: boolean = false,
    ) => {
        if (court) setCourtNumber(null);
        if (date) setDate(null);
        if (schedule) setSchedule(null);
        setPlayers([]);
    };
    const _resetPlayersFields = () => {
        setFieldsData({
            ...fieldsData,
            players: playersFields,
        });
    };
    const onChangeCheck = async (isChecked: boolean) => {
        let currentPlayers;
        if (isChecked && players.length < 4 && user_id) {
            currentPlayers = [...players, user_id?.toString()];
            setPlayers(currentPlayers);
            if (currentPlayers.length >= 2 && currentPlayers.length <= 4)
                setSteps({ ...steps, _players: StepStatus.DONE });
            if (currentPlayers.length < 2) setSteps({ ...steps, _players: StepStatus.PENDING });
        } else if (!isChecked) {
            currentPlayers = players.filter((player) => player.toString() !== user_id?.toString());
            setPlayers(currentPlayers);
            if (currentPlayers.length >= 2 && currentPlayers.length <= 4)
                setSteps({ ...steps, _players: StepStatus.DONE });
            else if (currentPlayers.length < 2)
                setSteps({ ...steps, _players: StepStatus.PENDING });
        }
    };
    const onChangeCourt = (selectedCourt: number) => {
        if (!selectedCourt) {
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
    const onChangeDate = async (e: DateTimePickerEvent, selectedDate: TDate | undefined) => {
        setShowDatePicker(false);
        if (e?.type === 'dismissed') {
            _resetDataState(false, true, true);
            setDateSelected(false);
            setSteps({
                ...steps,
                _date: StepStatus.PENDING,
                _schedule: StepStatus.PENDING,
                _players: StepStatus.PENDING,
            });
        } else if (e?.type === 'set' && selectedDate) {
            _resetDataState(false, false, true);
            await _getAvailbleSchedules(selectedDate);
            setDate(selectedDate!);
            setDateSelected(true);
            setSteps({
                ...steps,
                _date: StepStatus.DONE,
                _schedule: StepStatus.PENDING,
                _players: StepStatus.PENDING,
            });
        }
    };
    const onChangePlayers = async (selectedPlayers: any) => {
        if (selectedPlayers.length === 5 && players.length === 4)
            return showWarningAlert('Máximo 4 jugadores');
        else if (selectedPlayers.length === 4 && players.length === 3) {
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
    };
    const onChangeSchedule = async (selectedSchedule: string) => {
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
    };

    return (
        <View key="View-container" style={bookStyles.view}>
            <View
                key="View-court-select"
                style={{ ...bookStyles.viewPicker, marginBottom: 20, height: 50 }}
            >
                <RNPickerSelect
                    placeholder={pickerCourts}
                    useNativeAndroidPickerStyle={false}
                    textInputProps={{ style: { color: '#737373' } } as TextInputProps}
                    onValueChange={(value: number) => onChangeCourt(value)}
                    items={fieldsData?.courtNumbers}
                    value={courtNumber}
                />
            </View>

            {steps._court === StepStatus.DONE && (
                <View key="View-date-picker">
                    <Pressable onPress={() => _displayDatepicker('date')}>
                        <TextInput
                            style={{
                                ...bookStyles.textInputDatePicker,
                                marginBottom: 20,
                                height: 50,
                            }}
                            value={_formatDate(date, isDateSelected)}
                            editable={false}
                            placeholder={!date ? 'Seleccione una fecha' : date.toDateString()}
                        />
                    </Pressable>
                    {showDatePicker && (
                        <DateTimePicker
                            value={date ? date : new Date()}
                            mode={displaymode}
                            onChange={onChangeDate}
                            maximumDate={new Date(nextWeek)}
                            minimumDate={new Date()}
                        />
                    )}
                </View>
            )}

            {steps._date === StepStatus.DONE && (
                <View
                    key="View-court-time"
                    style={{ ...bookStyles.viewPicker, marginBottom: 20, height: 50 }}
                >
                    <RNPickerSelect
                        placeholder={schedulePickerProps}
                        useNativeAndroidPickerStyle={false}
                        textInputProps={{ style: { color: '#737373' } } as TextInputProps}
                        onValueChange={(value: string) => onChangeSchedule(value)}
                        items={fieldsData?.availableSchedules}
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
                            onPress={(isChecked: boolean) => onChangeCheck(isChecked)}
                        />
                    </View>

                    <View>
                        <MultiSelectPicker
                            _items={fieldsData.players}
                            _onChangeInput={(word: string) => _filterPlayersSelection(word)}
                            _onSelectedItemsChange={(items: any) => onChangePlayers(items)}
                            _selectedItems={players}
                            _resetFields={_resetPlayersFields}
                        />
                    </View>
                </>
            )}

            {steps._players === StepStatus.DONE && (
                <SharedButton
                    _btnStyle={{
                        position: 'absolute',
                        bottom: 20,
                        alignSelf: 'center',
                        width: 350,
                    }}
                    _buttonText="Reservar"
                    _onClick={() => _confirmBooking(courtNumber!, date!, schedule!, players, token)}
                />
            )}
        </View>
    );
}
