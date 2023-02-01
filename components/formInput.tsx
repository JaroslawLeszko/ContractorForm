import { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import AddImage from "./imagePicker";
import ErrorModal from "./errorModal";

import validatePesel from "./utils/peselValidator";

type FormData = {
  firstName: string;
  lastName: string;
  pesel?: string;
  nip?: string;
  image: string | null;
};

const schema = yup.object({
  firstName: yup.string().required().min(3),
  lastName: yup.string().required().min(3),
  pesel: yup.string().min(11),
  nip: yup.string().min(10),
});

export default function ContractorForm() {
  const [idType, setIdType] = useState("Osoba");
  const [modalVisible, setModalVisible] = useState(false);
  const [uUri, setUUri] = useState<string | null>("");
  const {
    control,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      image: "",
    },
  });

  function endAddGoalHandler() {
    setModalVisible(false);
  }

  function getImageUri(iuri: string | null) {
    setUUri(iuri!);
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    let contractorData = { ...data, image: uUri };

    if (validatePesel(contractorData.pesel as string) === false) {
      console.log("Numer PESEL jest niepoprawny");
    }
    // console.log(validatePesel("86030503171"));

    try {
      const response = await fetch("https://localhost:60001/Contractor/Save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contractorData),
      });
      console.log(response.body);
    } catch (err) {
      setModalVisible(true);
      console.log(err);
    }
  };

  return (
    <>
      <AddImage onAdd={getImageUri} />
      <View style={styles.inputContainer}>
        <ErrorModal visible={modalVisible} onCancel={endAddGoalHandler} />
        <Controller
          control={control}
          name="firstName"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Imię"
              style={styles.textInput}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.firstName && <Text>Imię musi mieć minnimum 3 znaki.</Text>}
        <Controller
          control={control}
          name="lastName"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Nazwisko"
              style={styles.textInput}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.lastName && <Text>Nazwisko musi mieć minnimum 3 znaki.</Text>}
        <View style={styles.picker}>
          <Picker
            selectedValue={idType}
            onValueChange={(itemValue) => {
              resetField(idType === "Osoba" ? "pesel" : "nip");
              setIdType(itemValue);
            }}
          >
            <Picker.Item label="Osoba" value={"Osoba"} />
            <Picker.Item label="Firma" value={"Firma"} />
          </Picker>
        </View>
        {idType === "Osoba" ? (
          <>
            <Controller
              control={control}
              name="pesel"
              rules={{
                required: true,
                minLength: 11,
                maxLength: 11,
              }}
              shouldUnregister
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  maxLength={11}
                  keyboardType="number-pad"
                  placeholder="PESEL"
                  style={styles.textInput}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.pesel && <Text>PESEL musi mieć 11 cyfr.</Text>}
          </>
        ) : (
          <>
            <Controller
              control={control}
              name="nip"
              rules={{
                required: true,
                minLength: 10,
                maxLength: 10,
              }}
              shouldUnregister
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  maxLength={10}
                  keyboardType="number-pad"
                  placeholder="NIP"
                  style={styles.textInput}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.nip && <Text>NIP musi mieć 10 cyfr.</Text>}
          </>
        )}

        <View style={styles.submitButton}>
          <Button
            title="Zapisz"
            color="#287F95"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // padding: 15,
    backgroundColor: "#ADD8E6",
  },
  picker: {
    // flex: 1,
    backgroundColor: "#CAE9F5",
    justifyContent: "center",
    width: "90%",
    borderRadius: 6,
    marginTop: 12,
  },

  textInput: {
    borderWidth: 1,
    borderColor: "#0d2c39",
    backgroundColor: "#9fd2e8",
    justifyContent: "center",
    color: "#144256",
    width: "90%",
    borderRadius: 6,
    padding: 8,
    marginTop: 12,
  },

  submitButton: {
    margin: 15,
    width: "50%",
  },
});
