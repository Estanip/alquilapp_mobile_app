import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { disabledBackgroundColor, sharedBtnStyles } from '../../../shared/styles/components.styles';

import { IConfirmBtnComponentProps } from '@/components/interfaces/auth.interfaces';

export default function CommonButton({
    _buttonText,
    _btnStyle = {},
    _onClick,
    _disabled,
}: IConfirmBtnComponentProps) {
    _btnStyle = _disabled ? { ..._btnStyle, backgroundColor: disabledBackgroundColor } : _btnStyle;
    return (
        <Pressable
            style={{ ...sharedBtnStyles.pressable, ..._btnStyle }}
            onPress={() => _onClick()}
            disabled={_disabled}
        >
            <View style={sharedBtnStyles.view}>
                <Text style={sharedBtnStyles.text}>{_buttonText}</Text>
            </View>
        </Pressable>
    );
}
