import React from "react";
import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarIcon: () => <Text>🐱</Text>,
        }}
      />

      <Tabs.Screen
        name="register"
        options={{
          title: "Register",
          tabBarIcon: () => <Text>🐱</Text>,
        }}
      />

      <Tabs.Screen name="(tabs)" options={{ href: null }} />
    </Tabs>
  );
}
