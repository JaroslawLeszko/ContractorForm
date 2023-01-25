import { StyleSheet, View } from "react-native";

import ContractorForm from "./components/formInput";
// import ImagePickerExample from "./components/imagePicker";

export default function App() {
  return (
    <View style={styles.container}>
      <ContractorForm />
      {/* <ImagePickerExample /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
});
