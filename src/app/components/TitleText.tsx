import React from 'react';
import { Text } from 'react-native';

type IProps = {
    title: string;
};

export default function TitleText({ title }: IProps) {
    return <Text className="mb-4 text-sky-800 text-lg font-bold">{title}</Text>;
}
