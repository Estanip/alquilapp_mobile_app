import React from "react";
import { Pressable, Text, View } from "react-native";
import { useTypedDispatch } from "../store";
import { checkToken, signIn } from "../api/auth";
import { Dispatch } from "@reduxjs/toolkit";

interface IProps {
  buttonText: string;
}

export default function AuthConfirmButton({ buttonText }: IProps) {
  const dispatch: Dispatch<any> = useTypedDispatch();

  return (
    <Pressable
      className="h-12 bg-blue-500 rounded-md flex flex-row justify-center items-center px-6"
      onPress={() => dispatch(checkToken())}
    >
      <View className="flex-1 flex items-center">
        <Text className="text-white text-base font-medium">{buttonText}</Text>
      </View>
    </Pressable>
  );
}
