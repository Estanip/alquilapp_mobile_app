import React from "react";
import { Stack } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function HomeLayout(): React.JSX.Element {
  return (
    <Stack>
      <Stack.Screen
        name="auth"
        options={{
          headerShown: true,
          title: "Bienvenido",
        }}
      />
    </Stack>
  );
}
