import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { sharedBtnStyles } from './styles';

import { IConfirmBtnComponentProps } from '@/components/interfaces/auth.interfaces';

export default function SharedButton({
    _buttonText,
    _btnStyle = {},
    _onClick,
}: IConfirmBtnComponentProps) {
    return (
        <Pressable
            style={{ ...sharedBtnStyles.pressable, ..._btnStyle }}
            onPress={() => _onClick()}
        >
            <View style={sharedBtnStyles.view}>
                <Text style={sharedBtnStyles.text}>{_buttonText}</Text>
            </View>
        </Pressable>
    );
}
