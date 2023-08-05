import { Stack } from "expo-router";

import { Text, View } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

const Login = () => {
  return (
    <StyledView className="bg-red-600">
      <StyledText className="text-center text-white">Logueate 🎉</StyledText>
      <Stack.Screen options={{ title: "Login" }} />
    </StyledView>
  );
};

export default Login;
