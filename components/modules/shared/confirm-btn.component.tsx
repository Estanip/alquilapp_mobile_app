import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { confirmBtnStyles } from './styles';

import { IConfirmBtnComponentProps } from '@/components/interfaces/auth.interfaces';

export default function AuthConfirmButton({ _buttonText, _onClick }: IConfirmBtnComponentProps) {
    return (
        <Pressable style={confirmBtnStyles.pressable} onPress={() => _onClick()}>
            <View style={confirmBtnStyles.view}>
                <Text style={confirmBtnStyles.text}>{_buttonText}</Text>
            </View>
        </Pressable>
    );
}
