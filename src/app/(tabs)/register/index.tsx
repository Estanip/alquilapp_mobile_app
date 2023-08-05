import { Stack } from "expo-router";
import { View } from "react-native";

const Register = () => {
  return (
    <View>
      <Stack.Screen options={{ title: "Register" }} />
    </View>
  );
};

export default Register;
