import React from 'react';
import { Text } from 'react-native';

import { titleTextStyles } from '../../../shared/styles/components.styles';

import { ITitleProps } from '@/components/interfaces';

export default function TitleText({ _title }: ITitleProps) {
  return <Text style={titleTextStyles.textInput}>{_title}</Text>;
}
