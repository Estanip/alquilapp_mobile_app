import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, View, type TextInputProps } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import DatePicker from '../shared/datePicker.component';
import {
    iconStyles,
    pickerMembershipTypeProps,
    sharedStyles,
    textInputStyles,
    viewPickerStyles,
    viewStyles,
} from '../shared/styles';

import {
    errorsState,
    fields,
    membershipTypes,
    registerFormData,
} from '@/components/constants/register.constants';
import { IControllerField } from '@/components/interfaces';
import { IRegisterComponentProps, TRegisterValues } from '@/components/interfaces/auth.interfaces';
import { TimeZones } from '@/constants';
import {
    PasswordIconNames,
    RegisterFieldNames,
    emailRegExp,
    identificationNumberRegExp,
    passwordRegExp,
    phoneNumberRegExp,
} from '@/constants/auth.constants';
import { IRegisterForm } from '@/screens/interfaces/register.interfaces';
import { showInfoAlert } from '@/shared/alerts/toast.alert';

export default function RegisterForm({
    _registerData,
    _validatedData,
}: IRegisterComponentProps): React.JSX.Element {
    // Errors state
    const [registerErrors, setRegisterErrors] = useState<IRegisterForm>(errorsState);

    // Register state
    const { control, setValue, getValues } = useForm<IRegisterForm>({
        defaultValues: registerFormData,
    });

    // Password visibility state
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [passwordIconName, setPasswordIconName] = useState(PasswordIconNames.EYE_OPEN);

    // Date Time Picker state
    const [date, setDate] = useState<Date>(new Date());
    const [isDateSelected, setDateSelected] = useState<boolean>(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const checkErrors = (value: string, key: keyof IRegisterForm) => {
        _validatedData(true);
        value = value?.trim();
        if (key === 'email') {
            setRegisterErrors({
                ...registerErrors,
                email: '',
            });
            if (!value?.length) {
                setRegisterErrors({
                    ...registerErrors,
                    email: 'Campo obligatorio',
                });
                _validatedData(false);
            } else if (!emailRegExp.exec(value)) {
                setRegisterErrors({
                    ...registerErrors,
                    email: 'Formato de email inválido',
                });
                _validatedData(false);
            }
        }
        if (key === 'password') {
            setRegisterErrors({
                ...registerErrors,
                password: '',
            });
            if (!value?.length) {
                setRegisterErrors({
                    ...registerErrors,
                    password: 'Campo obligatorio',
                });
                _validatedData(false);
            } else if (!passwordRegExp.exec(value)) {
                setRegisterErrors({
                    ...registerErrors,
                    password:
                        'La contraseña debe contener al menos 8 caracteres, un número, una letra y una mayúscula',
                });
                _validatedData(false);
            }
        }
        if (key === 'first_name') {
            setRegisterErrors({
                ...registerErrors,
                first_name: '',
            });
            if (!value?.length) {
                setRegisterErrors({
                    ...registerErrors,
                    first_name: 'Campo obligatorio',
                });
                _validatedData(false);
            }
        }
        if (key === 'last_name') {
            setRegisterErrors({
                ...registerErrors,
                last_name: '',
            });
            if (!value?.length) {
                setRegisterErrors({
                    ...registerErrors,
                    last_name: 'Campo obligatorio',
                });
                _validatedData(false);
            }
        }
        if (key === 'identification_number') {
            setRegisterErrors({
                ...registerErrors,
                identification_number: '',
            });
            if (!value?.length) {
                setRegisterErrors({
                    ...registerErrors,
                    identification_number: 'Campo obligatorio',
                });
                _validatedData(false);
            } else if (!identificationNumberRegExp.exec(value)) {
                setRegisterErrors({
                    ...registerErrors,
                    identification_number: 'Formato de DNI inválido',
                });
                _validatedData(false);
            }
        }
        if (key === 'phone_number') {
            setRegisterErrors({
                ...registerErrors,
                phone_number: '',
            });
            if (!value?.length) {
                setRegisterErrors({
                    ...registerErrors,
                    phone_number: 'Campo obligatorio',
                });
                _validatedData(false);
            } else if (!phoneNumberRegExp.exec(value)) {
                setRegisterErrors({
                    ...registerErrors,
                    phone_number: 'Formato de teléfono inválido',
                });
                _validatedData(false);
            }
        }
        if (key === 'birth_date') {
            setRegisterErrors({
                ...registerErrors,
                birth_date: '',
            });
            if (value === '0') {
                setRegisterErrors({
                    ...registerErrors,
                    birth_date: 'Campo obligatorio',
                });
                _validatedData(false);
            }
        }
        if (key === 'membership_type') {
            setRegisterErrors({
                ...registerErrors,
                membership_type: '',
            });
            if (!value?.length) {
                setRegisterErrors({
                    ...registerErrors,
                    membership_type: 'Campo obligatorio',
                });
                _validatedData(false);
            }
        }
    };
    const setValues = (value: any, field: any) => {
        setValue(field, value?.trim());
        _registerData(getValues());
        checkErrors(getValues(field), field);
    };
    const formatDate = (selectedDate: Date) => {
        if (isDateSelected) {
            let formatedDateToRender = selectedDate?.toLocaleString('en-GB', {
                timeZone: TimeZones.ARG,
            })!;
            formatedDateToRender = formatedDateToRender?.substring(0, 10);
            return formatedDateToRender;
        }

        return RegisterFieldNames.BIRTH_DATE;
    };
    const onChangeDate = (selectedDate: Date) => {
        setDate(selectedDate);
        setDateSelected(true);
        setValue('birth_date', selectedDate.toISOString()?.substring(0, 10));
        _registerData(getValues());
        checkErrors('1', 'birth_date');
        setShowDatePicker(false);
    };
    const onChangeMembershipType = (type: string) => {
        setValue('membership_type', type?.trim());
        _registerData(getValues());
        checkErrors(getValues('membership_type'), 'membership_type');
    };
    const showPassword = () => {
        setPasswordVisibility(!passwordVisibility);
        if (!passwordVisibility) setPasswordIconName(PasswordIconNames.EYE_CLOSED);
        else setPasswordIconName(PasswordIconNames.EYE_OPEN);
    };

    return (
        <>
            {fields.map(({ field_name, field_value }: IControllerField, index: number) => {
                if (
                    field_name !== RegisterFieldNames.BIRTH_DATE &&
                    field_name !== RegisterFieldNames.MEMBERSHIP_TYPE
                ) {
                    return (
                        <View key={`View-Register-${index}`}>
                            <Controller
                                control={control}
                                name={field_value as TRegisterValues}
                                render={() => (
                                    <View
                                        key={`View-Controller-${index}`}
                                        style={
                                            [
                                                RegisterFieldNames.PASSWORD,
                                                RegisterFieldNames.PHONE_NUMBER,
                                            ].includes(field_name as any) && viewStyles.withIcon
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
                                                !!(
                                                    field_name === RegisterFieldNames.PASSWORD &&
                                                    !passwordVisibility
                                                )
                                            }
                                            style={
                                                registerErrors[
                                                    `${field_value}` as keyof IRegisterForm
                                                ] === '' &&
                                                ![
                                                    RegisterFieldNames.PASSWORD,
                                                    RegisterFieldNames.PHONE_NUMBER,
                                                ].includes(field_name as any)
                                                    ? textInputStyles.success
                                                    : registerErrors[
                                                            `${field_value}` as keyof IRegisterForm
                                                        ] !== '' &&
                                                        ![
                                                            RegisterFieldNames.PASSWORD,
                                                            RegisterFieldNames.PHONE_NUMBER,
                                                        ].includes(field_name as any)
                                                      ? textInputStyles.error
                                                      : registerErrors[
                                                              `${field_value}` as keyof IRegisterForm
                                                          ] === '' &&
                                                          [
                                                              RegisterFieldNames.PASSWORD,
                                                              RegisterFieldNames.PHONE_NUMBER,
                                                          ].includes(field_name as any)
                                                        ? textInputStyles.successWithIcon
                                                        : textInputStyles.errorWithIcon
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
                                        />
                                        {[
                                            RegisterFieldNames.PHONE_NUMBER,
                                            RegisterFieldNames.PASSWORD,
                                        ].includes(field_name as any) && (
                                            <View
                                                key={`View-Icon-${index}`}
                                                style={viewStyles.icon}
                                            >
                                                <FontAwesome.Button
                                                    underlayColor="transparent"
                                                    name={
                                                        field_name === RegisterFieldNames.PASSWORD
                                                            ? passwordIconName
                                                            : 'question'
                                                    }
                                                    size={
                                                        field_name === RegisterFieldNames.PASSWORD
                                                            ? 14
                                                            : 18
                                                    }
                                                    iconStyle={iconStyles.icon}
                                                    style={iconStyles.background}
                                                    onPress={() => {
                                                        // eslint-disable-next-line no-unused-expressions
                                                        field_name === RegisterFieldNames.PASSWORD
                                                            ? showPassword()
                                                            : showInfoAlert(
                                                                  'Formato válido: 2922000000',
                                                              );
                                                    }}
                                                />
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

                if (field_name === RegisterFieldNames.MEMBERSHIP_TYPE) {
                    return (
                        <View key={`View-Select-${index}`}>
                            <View
                                style={
                                    !registerErrors['membership_type' as keyof IRegisterForm]
                                        ? viewPickerStyles.success
                                        : viewPickerStyles.error
                                }
                            >
                                <RNPickerSelect
                                    placeholder={pickerMembershipTypeProps}
                                    textInputProps={
                                        { style: { color: '#737373' } } as TextInputProps
                                    }
                                    useNativeAndroidPickerStyle={false}
                                    onValueChange={(value: string) => onChangeMembershipType(value)}
                                    items={membershipTypes}
                                    doneText="Seleccionar"
                                />
                            </View>
                            <Text style={sharedStyles.textError}>
                                {registerErrors[field_value as keyof IRegisterForm]}
                            </Text>
                        </View>
                    );
                }

                if (field_name === RegisterFieldNames.BIRTH_DATE) {
                    return (
                        <View key={`View-Date-${index}`} style={{ marginBottom: 20 }}>
                            <DatePicker
                                _showDatePicker={showDatePicker}
                                _onChangeDate={(selectedDate: Date) => onChangeDate(selectedDate)}
                                _setShowDatePicker={() => setShowDatePicker(!showDatePicker)}
                                _onCancel={() => setShowDatePicker(false)}
                                _hasError={registerErrors['birth_date']}
                                _formatDate={formatDate(date)}
                                _date={date}
                                _maximumDate={new Date()}
                                _placeholderText="Fecha de nacimiento"
                            />
                            <Text style={sharedStyles.textError}>
                                {registerErrors[field_value as keyof IRegisterForm]}
                            </Text>
                        </View>
                    );
                }
            })}
        </>
    );
}
