import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { confirmBtnStyles, disabledBackgroundColor } from '../../../shared/styles/components.styles';

import { IConfirmBtnComponentProps } from '@/components/interfaces/auth.interfaces';

export default function AuthConfirmButton({
    _buttonText,
    _onClick,
    _disabled,
}: IConfirmBtnComponentProps) {
    const disabledStyle = _disabled ? { backgroundColor: disabledBackgroundColor } : {};
    return (
        <Pressable
            style={{ ...confirmBtnStyles.pressable, ...disabledStyle }}
            onPress={() => _onClick()}
            disabled={_disabled}
        >
            <View style={confirmBtnStyles.view}>
                <Text style={confirmBtnStyles.text}>{_buttonText}</Text>
            </View>
        </Pressable>
    );
}
