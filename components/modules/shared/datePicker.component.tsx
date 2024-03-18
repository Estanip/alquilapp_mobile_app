import React from 'react';
import { Button, Platform, Pressable, Text, TextInput, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { textInputStyles } from '../shared/styles';

import { IDatePickerProps } from '@/components/interfaces';

export default function DatePicker({
    _showDatePicker,
    _onChangeDate,
    _setShowDatePicker,
    _hasError,
    _formatDate,
    _onCancel,
    _date,
    _minimumDate,
    _maximumDate,
    _placeholderText,
}: IDatePickerProps) {
    return (
        <>
            <DateTimePickerModal
                isVisible={_showDatePicker}
                onConfirm={(selectedDate) => _onChangeDate(selectedDate)}
                onCancel={_onCancel}
                confirmTextIOS="Confirmar"
                cancelTextIOS="Cancelar"
                minimumDate={_minimumDate}
                maximumDate={_maximumDate}
            />
            <View
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                }}
            >
                <TextInput
                    style={
                        !_hasError
                            ? { ...textInputStyles.success, width: 240 }
                            : { ...textInputStyles.error, width: 240 }
                    }
                    value={_date ? _formatDate : _placeholderText}
                    editable={false}
                />
                {Platform.OS === 'ios' ? (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Button color="#2196F3" title="Seleccionar" onPress={_setShowDatePicker} />
                    </View>
                ) : (
                    <Pressable
                        onPress={_setShowDatePicker}
                        style={{ alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Text
                            style={{
                                color: '#2196F3',
                                fontWeight: '600',
                                fontSize: 16,
                            }}
                        >
                            Seleccionar
                        </Text>
                    </Pressable>
                )}
            </View>
        </>
    );
}
