import React from 'react';
import { Pressable, Text, View } from 'react-native';

type IProps = {
    buttonText: string;
    onClick: () => void;
};

export default function AuthConfirmButton({ buttonText, onClick }: IProps) {
    return (
        <Pressable
            className="h-12 bg-sky-500 focus:bg-sky-700 disabled:bg-blue-200 rounded-md flex flex-row justify-center items-center px-6 mt-4"
            onPress={() => {
                onClick();
            }}
        >
            <View className="flex-1 flex items-center">
                <Text className="text-white text-base font-medium">{buttonText}</Text>
            </View>
        </Pressable>
    );
}
