import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { NativeWindStyleSheet } from "nativewind";
import store from "./store";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function HomeLayout(): React.JSX.Element {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name="auth"
          options={{
            headerShown: true,
            title: "Bienvenido",
          }}
        />
      </Stack>
    </Provider>
  );
}
