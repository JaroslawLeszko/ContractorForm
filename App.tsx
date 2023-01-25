import { StyleSheet, View } from "react-native";

import ContractorForm from "./components/formInput";

export default function App() {
  return (
    <View style={styles.container}>
      <ContractorForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
