import React, { useState, useEffect, SetStateAction } from "react";
import { Button, Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

interface Props {
  onAdd: (arg: string | null) => void;
}

export default function AddImage(props: Props) {
  const [image, setImage] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri as SetStateAction<any>);
    }
  };
  useEffect(() => {
    props.onAdd(image);
  }, [image]);

  return (
    <>
      <View style={styles.container}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <Button title="Dodaj zdjęcie" onPress={pickImage} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  image: {
    width: 350,
    height: 350,
    margin: 20,
    borderRadius: 6,
  },
});
