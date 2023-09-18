import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Text,
  TextInput,
  View,
  Pressable,
  StyleSheet,
  TextInputProps,
} from "react-native";
import {
  ControllerFieldI,
  RegisterFormI,
  TypeOfUserOptionsI,
} from "../interfaces/auth/Auth";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";

interface IProps {
  registerData: Function;
  validatedData: Function;
}

export default function RegisterForm({
  registerData,
  validatedData,
}: IProps): React.JSX.Element {
  const textInputStyle = "w-full bg-white border rounded-md h-12 px-4 my-1";
  const errorTextStyle = "pl-1 pb-2 text-red-600";
  const pickerPlaceholder = {
    label: "Selecciona tipo de usuario",
    value: null,
    color: "#737373",
  };

  const registerForm: RegisterFormI = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    identification_number: "",
    birth_date: "",
    type_of_user: "",
  };

  const errorState: RegisterFormI = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    identification_number: "",
    birth_date: "",
    type_of_user: "",
  };

  const fields: ControllerFieldI[] = [
    { value: "email", name: "Email" },
    { value: "password", name: "Contraseña" },
    { value: "first_name", name: "Nombre" },
    { value: "last_name", name: "Apellido" },
    { value: "identification_number", name: "DNI" },
    { value: "birth_date", name: "Fecha de nacimiento" },
    { value: "type_of_user", name: "Tipo de usuario" },
  ];

  type RegisterValuesT =
    | "email"
    | "password"
    | "first_name"
    | "last_name"
    | "identification_number";

  type DateTimePickerModesT = "date" | "time" | "datetime" | "countdown";
  type DateT = Date | undefined;

  // Register
  const [errors, setErrors] = useState<RegisterFormI>(errorState);
  const { control, setValue, getValues } = useForm<RegisterFormI>({
    defaultValues: registerForm,
  });

  const setValues = (value: string, field: keyof RegisterFormI) => {
    setValue(field, value?.trim());
    registerData(getValues());
    checkErrors();
  };

  const checkErrors = () => {
    validatedData(true);
    setErrors(errorState);
    const registerForm = getValues();
    for (const property in registerForm) {
      let value = registerForm[property as keyof RegisterFormI];
      value = value?.trim() as string;

      if (!value?.length) {
        setErrors((errors) => ({
          ...errors,
          [property]: "Campo obligatorio",
        }));
        validatedData(false);
      }
      if (property === "email") {
        if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          setErrors((errors) => ({
            ...errors,
            email: "Formato de email inválido",
          }));
          validatedData(false);
        }
      }
      if (property === "birth_date" && !isDateSelected) {
        setErrors((errors) => ({
          ...errors,
          [property]: "Campo obligatorio",
        }));
        validatedData(false);
      }
      if (property === "password") {
        if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
          setErrors((errors) => ({
            ...errors,
            password:
              "La contraseña debe contener al menos 8 caracteres, un número, una letra y una mayúscula",
          }));
          validatedData(false);
        }
      }
      if (property === "identification_number") {
        if (value.length > 8 || value.length < 7 || !value.match(/^[0-9]*$/)) {
          setErrors((errors) => ({
            ...errors,
            identification_number: "Formato de DNI inválido",
          }));
          validatedData(false);
        }
      }
    }
  };

  // Date Time Picker
  const [date, setDate] = useState<DateT>(new Date());
  const [isDateSelected, setDateSelected] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [displaymode, setMode] = useState<DateTimePickerModesT>("date");

  const formatDate = (date: DateT) => {
    if (isDateSelected) {
      let formatedDateToRender = date?.toLocaleString("en-GB", {
        timeZone: "UTC",
      }) as string;
      formatedDateToRender = formatedDateToRender?.substring(0, 10);

      let formatedDateToSetState = date?.toISOString() as string;
      formatedDateToSetState = formatedDateToSetState.substring(0, 10);

      setValue("birth_date", formatedDateToSetState?.trim());
      return formatedDateToRender;
    }
    return "Fecha de nacimiento";
  };

  const onChangeDate = (e: DateTimePickerEvent, selectedDate: DateT) => {
    if (e?.type === "dismissed") {
      setShowDatePicker(false);
      setDateSelected(false);

      registerData(getValues());
      checkErrors();
    } else if (e?.type === "set") {
      setShowDatePicker(false);
      setDate(selectedDate);
      setDateSelected(true);

      registerData(getValues());
      checkErrors();
    }
  };

  const displayDatepicker = (mode: DateTimePickerModesT) => {
    setMode(mode);
    setShowDatePicker(true);
  };

  // Type of user
  const [typeOfUser, setTypeOfUser] = useState("");
  const typesOfUsers: TypeOfUserOptionsI[] = [
    { label: "Abonado", value: "abonado" },
    { label: "Socio", value: "socio" },
    { label: "No Socio", value: "no_socio" },
  ];

  const onChangeTypeOfUser = (type: string) => {
    setTypeOfUser(type);
    setValue("type_of_user", type?.trim());

    registerData(getValues());
    checkErrors();
  };

  return (
    <View>
      {fields.map((field: ControllerFieldI, index: number) => {
        if (
          field.name != "Fecha de nacimiento" &&
          field.name != "Tipo de usuario"
        ) {
          return (
            <View key={`View-Register-${index}`}>
              <Controller
                control={control}
                name={field.value as RegisterValuesT}
                render={() => (
                  <TextInput
                    maxLength={field.name === "DNI" ? 8 : 30}
                    className={`${textInputStyle} ${
                      errors[`${field.value}` as keyof RegisterFormI] === ""
                        ? "border-slate-200"
                        : "border-red-400"
                    }`}
                    onChangeText={(value: string) =>
                      setValues(value, field.value as keyof RegisterFormI)
                    }
                    placeholder={field.name}
                  ></TextInput>
                )}
              />
              <Text className={errorTextStyle}>
                {errors[field.value as keyof RegisterFormI]}
              </Text>
            </View>
          );
        }
        if (field.name === "Fecha de nacimiento") {
          return (
            <View key={`View-Date-${index}`}>
              <Pressable onPress={() => displayDatepicker("date")}>
                <TextInput
                  style={{ color: "#737373" }}
                  className={`${textInputStyle} ${
                    isDateSelected ? "border-slate-200" : "border-red-400"
                  }`}
                  value={formatDate(date)}
                  editable={false}
                ></TextInput>
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  value={date as Date}
                  mode={displaymode}
                  onChange={onChangeDate}
                  maximumDate={new Date()}
                />
              )}
              {!isDateSelected && (
                <Text className={errorTextStyle}>Campo obligatorio</Text>
              )}
            </View>
          );
        }
        if (field.name === "Tipo de usuario") {
          return (
            <View key={`View-Select-${index}`} className="my-4">
              <View style={styles.pickerViewStyle}>
                <RNPickerSelect
                  placeholder={pickerPlaceholder}
                  useNativeAndroidPickerStyle={false}
                  textInputProps={
                    { style: { color: "#737373" } } as TextInputProps
                  }
                  onValueChange={(value: string) => onChangeTypeOfUser(value)}
                  items={typesOfUsers}
                />
              </View>
              {!typeOfUser && (
                <Text className={errorTextStyle}>Campo obligatorio</Text>
              )}
            </View>
          );
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  pickerViewStyle: {
    justifyContent: "center",
    paddingLeft: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    overflow: "hidden",
    height: 50,
    backgroundColor: "white",
  },
});
