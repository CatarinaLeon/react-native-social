import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { Camera } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
// import { Feather } from "@expo/vector-icons";
// import { Button } from "react-native-web";

const CreateScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Camera style={styles.camera}>
          <TouchableOpacity onPress={() => {}} style={styles.snapContainer}>
            {/* <Text style={styles.snap}>SNAP</Text> */}
            <FontAwesome
              style={styles.snap}
              name="camera"
              size={24}
              color="#BDBDBD"
            />
          </TouchableOpacity>
        </Camera>
        <TouchableOpacity>
          <Text style={styles.photo}>Загрузите фото</Text>
        </TouchableOpacity>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            textAlign={"center"}
            placeholder="Название..."
          />
          <TextInput
            style={{ ...styles.input, marginTop: 32 }}
            textAlign={"center"}
            placeholder="Местность..."
          />
        </View>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.button}>Опубликовать</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity activeOpacity={0.9} style={styles.buttonDelete}>
        <Feather name="trash-2" size={24} color="#DADADA" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",

    justifyContent: "space-between",
    flexDirection: "column",
    // alignItems: "center",
  },
  camera: {
    height: 240,
    marginHorizontal: 16,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  // snap: {
  //   color: "#fff",
  // },
  snapContainer: {
    borderWidth: 1,
    backgroundColor: "#f6f6f6",
    width: 60,
    height: 60,
    borderRadius: 50,
    // color: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    marginHorizontal: 16,
    marginTop: 8,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  formContainer: {
    marginTop: 32,
  },
  input: {
    // marginTop: 32,
    marginHorizontal: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    padding: 10,
    textAlign: "left",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    textAlign: "center",
    marginHorizontal: 16,
    marginTop: 32,
    padding: 16,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
  },
  buttonDelete: {
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    padding: 8,
    width: 70,
    marginBottom: 22,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default CreateScreen;
