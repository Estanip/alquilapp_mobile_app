import { IConfirmBtnComponentProps } from '@/components/interfaces/auth.interfaces';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { confirmBtnStyles } from './styles';

export default function AuthConfirmButton({ buttonText, onClick }: IConfirmBtnComponentProps) {
    return (
        <Pressable style={confirmBtnStyles.pressable} onPress={() => onClick()}>
            <View style={confirmBtnStyles.view}>
                <Text style={confirmBtnStyles.text}>{buttonText}</Text>
            </View>
        </Pressable>
    );
}
