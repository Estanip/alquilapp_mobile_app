import { MembershipTypes } from '@/src/app/constants/user.constants';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Text, TextInput, View, type TextInputProps } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { IRegisterForm } from '../../../screens/interfaces/register.interfaces';
import { IControllerField, ISelectOptions } from '../../interfaces';
import {
    IRegisterComponentProps,
    TDate,
    TDateTimePickerModes,
    TRegisterValues,
} from '../../interfaces/auth.interfaces';
import { pickerMembershipTypeProps, sharedStyles, styles } from './styles';

export default function Register({
    registerData,
    validatedData,
}: IRegisterComponentProps): React.JSX.Element {
    const registerFormData: IRegisterForm = {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        identification_number: '',
        birth_date: '',
        membership_type: '',
    };
    const errorState: IRegisterForm = {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        identification_number: '',
        birth_date: '',
        membership_type: '',
    };
    const fields: IControllerField[] = [
        { value: 'email', name: 'Email' },
        { value: 'password', name: 'Contraseña' },
        { value: 'first_name', name: 'Nombre' },
        { value: 'last_name', name: 'Apellido' },
        { value: 'identification_number', name: 'DNI' },
        { value: 'birth_date', name: 'Fecha de nacimiento' },
        { value: 'type_of_user', name: 'Tipo de usuario' },
    ];

    // Type of user
    const [membershipType, setMembershipType] = useState('');
    const membershipTypes: ISelectOptions[] = [
        { label: MembershipTypes.ABONADO, value: MembershipTypes.ABONADO },
        { label: MembershipTypes.SOCIO, value: MembershipTypes.SOCIO },
        { label: MembershipTypes.NO_SOCIO, value: MembershipTypes.NO_SOCIO },
    ];

    // Date Time Picker
    const [date, setDate] = useState<TDate>(new Date());
    const [isDateSelected, setDateSelected] = useState<boolean>(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [displaymode, setMode] = useState<TDateTimePickerModes>('date');

    // Register
    const [registerErrors, setRegisterErrors] = useState<IRegisterForm>(errorState);
    const { control, setValue, getValues } = useForm<IRegisterForm>({
        defaultValues: registerFormData,
    });

    const checkErrors = () => {
        validatedData(true);
        setRegisterErrors(errorState);
        const registerForm = getValues();
        for (const property in registerForm) {
            let value = registerForm[property as keyof IRegisterForm];

            value = value.trim();

            if (!value.length) {
                setRegisterErrors((errors) => ({
                    ...errors,
                    [property]: 'Campo obligatorio',
                }));
                validatedData(false);
            }

            if (property === 'email') {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.exec(value)) {
                    setRegisterErrors((errors) => ({
                        ...errors,
                        email: 'Formato de email inválido',
                    }));
                    validatedData(false);
                }
            }

            if (property === 'password') {
                if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.exec(value)) {
                    setRegisterErrors((errors) => ({
                        ...errors,
                        password:
                            'La contraseña debe contener al menos 8 caracteres, un número, una letra y una mayúscula',
                    }));
                    validatedData(false);
                }
            }

            if (property === 'identification_number') {
                if (value.length > 8 || value.length < 7 || !/^[0-9]*$/.exec(value)) {
                    setRegisterErrors((errors) => ({
                        ...errors,
                        identification_number: 'Formato de DNI inválido',
                    }));
                    validatedData(false);
                }
            }

            if (property === 'birth_date' && !isDateSelected) {
                setRegisterErrors((errors) => ({
                    ...errors,
                    [property]: 'Campo obligatorio',
                }));
                validatedData(false);
            }
        }
    };
    const setValues = (value: string, field: keyof IRegisterForm) => {
        setValue(field, value?.trim());
        registerData(getValues());
        checkErrors();
    };

    const formatDate = (selectedDate: TDate) => {
        if (isDateSelected) {
            let formatedDateToRender = selectedDate?.toLocaleString('en-GB', {
                timeZone: 'UTC',
            })!;
            formatedDateToRender = formatedDateToRender?.substring(0, 10);
            let formatedDateToSetState = selectedDate?.toISOString()!;
            formatedDateToSetState = formatedDateToSetState.substring(0, 10);
            setValue('birth_date', formatedDateToSetState?.trim());
            return formatedDateToRender;
        }

        return 'Fecha de nacimiento';
    };
    const onChangeDate = (e: DateTimePickerEvent, selectedDate: TDate | undefined) => {
        if (e?.type === 'dismissed') {
            setShowDatePicker(false);
            setDateSelected(false);
            registerData(getValues());
            checkErrors();
        } else if (e?.type === 'set') {
            setShowDatePicker(false);
            setDate(selectedDate!);
            setDateSelected(true);
            registerData(getValues());
            checkErrors();
        }
    };
    const displayDatepicker = (mode: TDateTimePickerModes) => {
        setMode(mode);
        setShowDatePicker(true);
    };
    const onChangeTypeOfUser = (type: string) => {
        setMembershipType(type);
        setValue('membership_type', type?.trim());
        registerData(getValues());
        checkErrors();
    };

    return (
        <View>
            {fields.map((field: IControllerField, index: number) => {
                if (field.name != 'Fecha de nacimiento' && field.name != 'Tipo de usuario') {
                    return (
                        <View key={`View-Register-${index}`}>
                            <Controller
                                control={control}
                                name={field.value as TRegisterValues}
                                render={() => (
                                    <TextInput
                                        maxLength={field.name === 'DNI' ? 8 : 30}
                                        className={`${sharedStyles.textInput} ${
                                            registerErrors[
                                                `${field.value}` as keyof IRegisterForm
                                            ] === ''
                                                ? 'border-slate-200'
                                                : 'border-red-400'
                                        }`}
                                        onChangeText={(value: string) =>
                                            setValues(value, field.value as keyof IRegisterForm)
                                        }
                                        placeholder={field.name}
                                    ></TextInput>
                                )}
                            />
                            <Text className={sharedStyles.textError}>
                                {registerErrors[field.value as keyof IRegisterForm]}
                            </Text>
                        </View>
                    );
                }

                if (field.name === 'Fecha de nacimiento') {
                    return (
                        <View key={`View-Date-${index}`}>
                            <Pressable
                                onPress={() => {
                                    displayDatepicker('date');
                                }}
                            >
                                <TextInput
                                    style={{ color: '#737373' }}
                                    className={`${sharedStyles.textInput} ${
                                        isDateSelected ? 'border-slate-200' : 'border-red-400'
                                    }`}
                                    value={formatDate(date)}
                                    editable={false}
                                ></TextInput>
                            </Pressable>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={date!}
                                    mode={displaymode}
                                    onChange={onChangeDate}
                                    maximumDate={new Date()}
                                />
                            )}
                            {!isDateSelected && (
                                <Text className={sharedStyles.textError}>Campo obligatorio</Text>
                            )}
                        </View>
                    );
                }

                if (field.name === 'Tipo de usuario') {
                    return (
                        <View key={`View-Select-${index}`} className="my-4">
                            <View style={styles.pickerViewStyle}>
                                <RNPickerSelect
                                    placeholder={pickerMembershipTypeProps}
                                    useNativeAndroidPickerStyle={false}
                                    textInputProps={
                                        { style: { color: '#737373' } } as TextInputProps
                                    }
                                    onValueChange={(value: string) => {
                                        onChangeTypeOfUser(value);
                                    }}
                                    items={membershipTypes}
                                />
                            </View>
                            {!membershipType && (
                                <Text className={sharedStyles.textError}>Campo obligatorio</Text>
                            )}
                        </View>
                    );
                }
            })}
        </View>
    );
}
