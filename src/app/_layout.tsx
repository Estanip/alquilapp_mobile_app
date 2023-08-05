import React from "react";
import { Stack } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function HomeLayout() {
  return <Stack />;
}
