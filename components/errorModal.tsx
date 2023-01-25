import { StyleSheet, View, Button, Modal, Image, Text } from "react-native";

interface Props {
  visible: boolean;
  onCancel: () => void;
}

export default function ErrorModal(props: Props) {
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/warning-512.png")}
        />
        <Text style={styles.textMessage}>Nie znaleziono metody zapisu.</Text>
        <View style={styles.button}>
          <Button title="Zamknij" onPress={props.onCancel} color="red" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ADD8E6",
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  textMessage: {
    color: "red",
    fontWeight: "900",
    fontSize: 20,
  },
  button: {
    width: "30%",
    margin: 20,
  },
});
