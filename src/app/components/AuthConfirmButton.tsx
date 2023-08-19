import React from "react";
import { Pressable, Text, View } from "react-native";

interface IProps {
  buttonText: string;
}

export default function AuthConfirmButton({ buttonText }: IProps) {
  return (
    <Pressable className="h-12 bg-blue-500 rounded-md flex flex-row justify-center items-center px-6">
      <View className="flex-1 flex items-center">
        <Text className="text-white text-base font-medium">{buttonText}</Text>
      </View>
    </Pressable>
  );
}
