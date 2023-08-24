import React from "react";
import { View } from "react-native";
import AuthConfirmButton from "../components/AuthConfirmButton";
import AuthRedirectButton from "../components/AuthRedirectButton";

export default function RegisterScreen(): React.JSX.Element {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50">
      <View className="p-8 w-full max-w-sm">
        {/* <Text className="text-5xl font-bold mb-6 text-slate-900">Iniciar sesión</Text> */}
        {/* 
        <AuthInput placeholderText="Ingrese email"></AuthInput>
        <AuthInput placeholderText="Ingrese contraseña"></AuthInput>
 */}
        <View className="flex flex-row justify-between items-center my-8">
          {/*           <View className="flex-row items-center">
            <Pressable className="bg-white border border-slate-200 h-6 w-6 rounded-sm mr-2 flex items-center justify-center">
              <View className="bg-blue-400 w-4 h-4 rounded-sm" />
            </Pressable>
            <Text className="text-slate-900">Recuerdame</Text>
          </View> */}

          <AuthRedirectButton
            navigateTo="login"
            redirectButtonText="Ya estoy registrado"
          ></AuthRedirectButton>
        </View>
        {/*  <AuthConfirmButton buttonText="Registrarme"></AuthConfirmButton> */}
      </View>
    </View>
  );
}
