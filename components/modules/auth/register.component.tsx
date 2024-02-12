import { IControllerField, ISelectOptions } from '@/components/interfaces';
import {
    IRegisterComponentProps,
    TDate,
    TDateTimePickerModes,
    TRegisterValues,
} from '@/components/interfaces/auth.interfaces';
import {
    PasswordIconNames,
    RegisterFieldNames,
    RegisterFieldValues,
    emailRegExp,
    identificationNumberRegExp,
    passwordRegExp,
    phoneNumberRegExp,
} from '@/constants/auth.constants';
import { MembershipTypes } from '@/constants/user.constants';
import { IRegisterForm } from '@/screens/interfaces/register.interfaces';
import { showInfoAlert } from '@/shared/alerts/info.alert';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Text, TextInput, View, type TextInputProps } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { pickerMembershipTypeProps, sharedStyles } from './styles';

export default function RegisterForm({
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
        { field_value: RegisterFieldValues.EMAIL, field_name: RegisterFieldNames.EMAIL },
        { field_value: RegisterFieldValues.PASSWORD, field_name: RegisterFieldNames.PASSWORD },
        { field_value: RegisterFieldValues.FIRST_NAME, field_name: RegisterFieldNames.FIRST_NAME },
        { field_value: RegisterFieldValues.LAST_NAME, field_name: RegisterFieldNames.LAST_NAME },
        {
            field_value: RegisterFieldValues.IDENTIFICATION_NUMBER,
            field_name: RegisterFieldNames.IDENTIFICATION_NUMBER,
        },
        {
            field_value: RegisterFieldValues.PHONE_NUMBER,
            field_name: RegisterFieldNames.PHONE_NUMBER,
        },
        { field_value: RegisterFieldValues.BIRTH_DATE, field_name: RegisterFieldNames.BIRTH_DATE },
        {
            field_value: RegisterFieldValues.MEMBERSHIP_TYPE,
            field_name: RegisterFieldNames.MEMBERSHIP_TYPE,
        },
    ];

    //Show Password
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [passwordIconName, setPasswordIconName] = useState(PasswordIconNames.EYE_OPEN);

    // Type of user
    const [membershipType, setMembershipType] = useState('');
    const membershipTypes: ISelectOptions[] = [
        { label: MembershipTypes.ABONADO, value: MembershipTypes.ABONADO },
        { label: MembershipTypes.SOCIO, value: MembershipTypes.SOCIO },
        { label: MembershipTypes.NO_SOCIO, value: MembershipTypes.NO_SOCIO },
    ];

    // Date Time Picker
    const [date, setDate] = useState<TDate>(new Date());
    const [isDateSelected, setDateSelected] = useState<boolean | null>(null);
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
            if (typeof value === 'string') {
                value = value.trim();
                if (value === '') {
                    setRegisterErrors((errors) => ({
                        ...errors,
                        [property]: 'Campo obligatorio',
                    }));
                    validatedData(false);
                }
                if (property === 'email' && value != '') {
                    if (!emailRegExp.exec(value)) {
                        setRegisterErrors((errors) => ({
                            ...errors,
                            email: 'Formato de email inválido',
                        }));
                        validatedData(false);
                    }
                }
                if (property === 'password' && value != '') {
                    if (!passwordRegExp.exec(value)) {
                        setRegisterErrors((errors) => ({
                            ...errors,
                            password:
                                'La contraseña debe contener al menos 8 caracteres, un número, una letra y una mayúscula',
                        }));
                        validatedData(false);
                    }
                }
                if (property === 'identification_number' && value != '') {
                    if (!identificationNumberRegExp.exec(value)) {
                        setRegisterErrors((errors) => ({
                            ...errors,
                            identification_number: 'Formato de DNI inválido',
                        }));
                        validatedData(false);
                    }
                }
                if (property === 'phone_number' && value != '') {
                    if (!phoneNumberRegExp.exec(value)) {
                        setRegisterErrors((errors) => ({
                            ...errors,
                            phone_number: 'Formato de teléfono inválido',
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

        return RegisterFieldNames.BIRTH_DATE;
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
    const onChangeMembershipType = (type: string) => {
        setMembershipType(type);
        setValue('membership_type', type?.trim());
        registerData(getValues());
        checkErrors();
    };
    const showPassword = () => {
        setPasswordVisibility(!passwordVisibility);
        if (!passwordVisibility) setPasswordIconName(PasswordIconNames.EYE_CLOSED);
        else setPasswordIconName(PasswordIconNames.EYE_OPEN);
    };

    return (
        <View>
            {fields.map(({ field_name, field_value }: IControllerField, index: number) => {
                if (
                    field_name != RegisterFieldNames.BIRTH_DATE &&
                    field_name != RegisterFieldNames.MEMBERSHIP_TYPE
                ) {
                    return (
                        <View key={`View-Register-${index}`} style={sharedStyles.view}>
                            <Controller
                                control={control}
                                name={field_value as TRegisterValues}
                                render={() => (
                                    <View
                                        style={
                                            [
                                                RegisterFieldNames.PASSWORD,
                                                RegisterFieldNames.PHONE_NUMBER,
                                            ].includes(field_name as any) &&
                                            sharedStyles.viewWithIcon
                                        }
                                    >
                                        <TextInput
                                            keyboardType={
                                                field_name ===
                                                    RegisterFieldNames.IDENTIFICATION_NUMBER ||
                                                field_name === RegisterFieldNames.PHONE_NUMBER
                                                    ? 'number-pad' ||
                                                      'numeric' ||
                                                      'visible-password'
                                                    : field_name === RegisterFieldNames.PHONE_NUMBER
                                                      ? 'decimal-pad'
                                                      : 'default'
                                            }
                                            secureTextEntry={
                                                field_name === RegisterFieldNames.PASSWORD &&
                                                !passwordVisibility
                                                    ? true
                                                    : false
                                            }
                                            style={
                                                registerErrors[
                                                    `${field_value}` as keyof IRegisterForm
                                                ] === ''
                                                    ? sharedStyles.textInputSuccess
                                                    : sharedStyles.textInputError
                                            }
                                            maxLength={
                                                field_name ===
                                                RegisterFieldNames.IDENTIFICATION_NUMBER
                                                    ? 8
                                                    : field_name === RegisterFieldNames.PHONE_NUMBER
                                                      ? 10
                                                      : 30
                                            }
                                            onChangeText={(value: string) =>
                                                setValues(value, field_value as keyof IRegisterForm)
                                            }
                                            placeholder={field_name}
                                        ></TextInput>
                                        {field_name === RegisterFieldNames.PHONE_NUMBER && (
                                            <View style={sharedStyles.iconView}>
                                                <FontAwesome.Button
                                                    name="question"
                                                    backgroundColor="#3b5998"
                                                    size={16}
                                                    iconStyle={sharedStyles.icon}
                                                    onPress={() =>
                                                        showInfoAlert('Formato válido: 2922000000')
                                                    }
                                                ></FontAwesome.Button>
                                            </View>
                                        )}
                                        {field_name === RegisterFieldNames.PASSWORD && (
                                            <View style={sharedStyles.iconView}>
                                                <FontAwesome.Button
                                                    name={passwordIconName as PasswordIconNames}
                                                    backgroundColor="#3b5998"
                                                    size={16}
                                                    iconStyle={sharedStyles.icon}
                                                    onPress={() => showPassword()}
                                                ></FontAwesome.Button>
                                            </View>
                                        )}
                                    </View>
                                )}
                            />
                            <Text style={sharedStyles.textError}>
                                {registerErrors[field_value as keyof IRegisterForm]}
                            </Text>
                        </View>
                    );
                }

                if (field_name === RegisterFieldNames.BIRTH_DATE) {
                    return (
                        <View key={`View-Date-${index}`} style={sharedStyles.view}>
                            <Pressable
                                onPress={() => {
                                    displayDatepicker('date');
                                }}
                            >
                                <TextInput
                                    style={
                                        isDateSelected != false
                                            ? sharedStyles.textInputSuccess
                                            : sharedStyles.textInputError
                                    }
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
                        </View>
                    );
                }

                if (field_name === RegisterFieldNames.MEMBERSHIP_TYPE) {
                    return (
                        <View
                            key={`View-Select-${index}`}
                            style={{ marginVertical: 16, maxWidth: '95%', marginLeft: 5 }}
                        >
                            <View style={sharedStyles.pickerView}>
                                <RNPickerSelect
                                    placeholder={pickerMembershipTypeProps}
                                    useNativeAndroidPickerStyle={false}
                                    textInputProps={
                                        { style: { color: '#737373' } } as TextInputProps
                                    }
                                    onValueChange={(value: string) => {
                                        onChangeMembershipType(value);
                                    }}
                                    items={membershipTypes}
                                />
                            </View>
                        </View>
                    );
                }
            })}
        </View>
    );
}
