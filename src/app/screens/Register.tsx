import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import AuthRedirectButton from "../components/AuthRedirectButton";
import RegisterForm from "../components/RegisterForm";
import AuthConfirmButton from "../components/AuthConfirmButton";
import { RegisterFormI } from "../interfaces/auth/Auth";
import TitleText from "../components/TitleText";
import { useTypedDispatch } from "../store";
import { Dispatch } from "@reduxjs/toolkit";
import { signUp } from "../api/auth";

export default function RegisterScreen(): React.JSX.Element {
  const dispatch: Dispatch<any> = useTypedDispatch();

  const registerForm: RegisterFormI = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    identification_number: "",
    birth_date: "",
    type_of_user: "",
  };

  const [registerState, setRegisterState] =
    useState<RegisterFormI>(registerForm);
  const [validatedData, setDataValidated] = useState<boolean>();

  const handleRegisterData = (data: RegisterFormI) => {
    setRegisterState(data);
  };

  const handleDataValidated = (data: boolean) => {
    setDataValidated(data);
  };

  const confirmRegister = () => {
    const notCompleted = Object.values(registerState).some(
      (e) => !e || e === ""
    );
    if (notCompleted || !validatedData)
      window.alert("Completa los campos correctamente antes de continuar");
    else dispatch(signUp(registerState));
  };

  return (
    <View className="items-center justify-center bg-slate-50">
      <ScrollView className="px-8 my-5 w-full max-w-sm">
        <TitleText title="Registro"></TitleText>
        <RegisterForm
          registerData={handleRegisterData}
          validatedData={handleDataValidated}
        ></RegisterForm>
        <AuthRedirectButton
          navigateTo="login"
          redirectButtonText="Ya estoy registrado"
        ></AuthRedirectButton>
        <AuthConfirmButton
          buttonText="Registro"
          onClick={confirmRegister}
        ></AuthConfirmButton>
      </ScrollView>
    </View>
  );
}
