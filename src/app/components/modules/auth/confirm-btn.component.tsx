import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { IConfirmBtnComponentProps } from '../../interfaces/auth.interfaces';
import { confirmBtnStyles } from './styles';

export default function AuthConfirmButton({ buttonText, onClick }: IConfirmBtnComponentProps) {
    return (
        <Pressable
            className={confirmBtnStyles.pressableConfirmBtnStyle}
            onPress={() => {
                onClick();
            }}
        >
            <View className={confirmBtnStyles.viewConfirmBtnStyle}>
                <Text className={confirmBtnStyles.textConfirmBtnStyle}>{buttonText}</Text>
            </View>
        </Pressable>
    );
}
