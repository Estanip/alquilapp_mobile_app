import React from "react";
import { Pressable, Text } from "react-native";
import { router } from "expo-router";

interface IProps {
  navigateTo: string;
  redirectButtonText: string;
}

export default function AuthRedirectButton({
  navigateTo,
  redirectButtonText,
}: IProps) {
  const route = navigateTo === "register" ? "/auth/register" : "/auth/login";

  return (
    <Pressable onPress={() => router.replace(route)}>
      <Text className="text-blue-400 font-bold">{redirectButtonText}</Text>
    </Pressable>
  );
}
