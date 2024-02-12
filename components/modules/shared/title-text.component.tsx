import { ITitleProps } from '@/components/interfaces';
import React from 'react';
import { Text } from 'react-native';
import { titleTextStyles } from './styles';

export default function TitleText({ title }: ITitleProps) {
    return <Text style={titleTextStyles.textInput}>{title}</Text>;
}
