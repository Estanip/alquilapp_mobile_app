import React from "react";
import { TextInput } from "react-native";

interface IProps {
  placeholderText?: string;
}

export default function AuthInput({
  placeholderText,
}: IProps): React.JSX.Element {
  return (
    <TextInput
      className="w-full bg-white border border-slate-200 rounded-md h-12 px-4"
      placeholderTextColor="#000"
      placeholder={placeholderText}
    />
  );
}
