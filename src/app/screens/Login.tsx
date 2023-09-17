import React, { useState } from "react";
import { View } from "react-native";
import AuthConfirmButton from "../components/AuthConfirmButton";
import AuthRedirectButton from "../components/AuthRedirectButton";
import LoginForm from "../components/LoginForm";
import { useTypedDispatch } from "../store";
import { Dispatch } from "@reduxjs/toolkit";
import { signIn } from "../api/auth";
import TitleText from "../components/TitleText";

export default function LoginScreen(): React.JSX.Element {
  const dispatch: Dispatch<any> = useTypedDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validatedData, setDataValidated] = useState<boolean>();

  const handleEmailData = (data: string) => {
    setEmail(data);
  };

  const handlePasswordData = (data: string) => {
    setPassword(data);
  };

  const handleDataValidated = (data: boolean) => {
    setDataValidated(data);
  };

  const confirmLogin = () => {
    if (password === "" || email === "" || !validatedData)
      window.alert("Completa los campos correctamente antes de continuar");
    else dispatch(signIn(email, password));
  };

  return (
    <View className="items-center bg-slate-50">
      <View className="p-8 w-full max-w-sm">
        <TitleText title="Ingreso"></TitleText>
        <LoginForm
          emailData={handleEmailData}
          passwordData={handlePasswordData}
          validatedData={handleDataValidated}
        ></LoginForm>
        <View className="flex flex-row justify-between items-center mb-6">
          <AuthRedirectButton
            navigateTo="register"
            redirectButtonText="Aún no estoy registrado"
          ></AuthRedirectButton>
          <AuthRedirectButton
            navigateTo="register"
            redirectButtonText="Recuperar contraseña"
          ></AuthRedirectButton>
        </View>
        <AuthConfirmButton
          buttonText="Inciar sesión"
          onClick={confirmLogin}
        ></AuthConfirmButton>
      </View>
    </View>
  );
}
