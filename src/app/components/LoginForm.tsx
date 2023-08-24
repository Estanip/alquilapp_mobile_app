import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Text, TextInput } from "react-native";

interface IProps {
  emailData: Function;
  passwordData: Function;
  validatedData: Function;
}

export default function LoginForm({
  emailData,
  passwordData,
  validatedData,
}: IProps): React.JSX.Element {
  const textInputStyle = "w-full bg-white border rounded-md h-12 px-4 my-1";

  const errorTextStyle = "pl-1 pb-2 text-red-600	";

  type LoginForm = {
    email: string;
    password: string;
  };

  type ErrorsState = {
    email: string;
    password: string;
  };

  const [errors, setErrors] = useState<ErrorsState>({
    email: "",
    password: "",
  });
  const { control, setValue, getValues } = useForm<LoginForm>();

  const setEmail = (value: string) => {
    setValue("email", value);
    emailData(getValues("email"));
    checkErrors(getValues("email"), "email");
  };

  const setPassword = (value: string) => {
    setValue("password", value);
    passwordData(getValues("password"));
    checkErrors(getValues("password"), "password");
  };

  const checkErrors = (value: string, field: string) => {
    validatedData(true);
    setErrors({
      email: "",
      password: "",
    });
    value = value.trim();
    if (field === "email") {
      if (value.length > 0 && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setErrors({
          email: "Formato de email inválido",
          password: errors.password,
        });
        validatedData(false);
      }
      if (value.length === 0) {
        setErrors({
          email: "Campo obligatorio",
          password: errors.password,
        });
        validatedData(false);
      }
    }
    if (field === "password") {
      if (
        value.length > 0 &&
        !value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      ) {
        setErrors({
          email: errors.email,
          password:
            "La contraseña debe contener al menos 8 caracteres, un número, una letra y una mayúscula",
        });
        validatedData(false);
      }

      if (value.length === 0) {
        setErrors({
          email: errors.email,
          password: "Campo obligatorio",
        });
        validatedData(false);
      }
    }
  };

  return (
    <>
      <Controller
        control={control}
        name="email"
        render={() => (
          <TextInput
            className={`${textInputStyle} ${
              errors.email === "" ? "border-slate-200" : "border-red-400"
            }`}
            onChangeText={(value: string) => setEmail(value)}
            placeholder="Ingrese email"
          ></TextInput>
        )}
      />
      <Text className={errorTextStyle}>{errors.email}</Text>
      <Controller
        control={control}
        name="password"
        render={() => (
          <TextInput
            className={`${textInputStyle} ${
              errors.password === "" ? "border-slate-200" : "border-red-400"
            }`}
            onChangeText={(value: string) => setPassword(value)}
            placeholder="Ingrese contraseña"
          ></TextInput>
        )}
      />
      <Text className={errorTextStyle}>{errors.password}</Text>
    </>
  );
}
