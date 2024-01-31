import React from 'react';
import { Text } from 'react-native';
import { ITitleProps } from '../../interfaces';
import { titleTextStyles } from './styles';

export default function TitleText({ title }: ITitleProps) {
    return <Text className={titleTextStyles.textInput}>{title}</Text>;
}
