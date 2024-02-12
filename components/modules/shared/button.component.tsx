import { IConfirmBtnComponentProps } from '@/components/interfaces/auth.interfaces';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { sharedBtnStyles } from './styles';

export default function SharedButton({
    buttonText,
    btnStyle = {},
    onClick,
}: IConfirmBtnComponentProps) {
    return (
        <Pressable style={{ ...sharedBtnStyles.pressable, ...btnStyle }} onPress={() => onClick()}>
            <View style={sharedBtnStyles.view}>
                <Text style={sharedBtnStyles.text}>{buttonText}</Text>
            </View>
        </Pressable>
    );
}
