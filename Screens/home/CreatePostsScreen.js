import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { Camera  } from "expo-camera";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { getStorage, ref } from "firebase/storage";
import app from "../../firebase/config";
const storage = getStorage(app);

const CreateScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    // if (camera) {
      // let file = await camera.takePictureAsync()
      console.log('camera.takePictureAsync()----->',camera.takePictureAsync())
      // setPhoto(file.uri)

    // }

  }
    

  const uploadPhotoToServer = async () => {
      const response = await fetch(photo);
      const file = await response.blob();
      const uniquePostId = Date.now().toString();
      const data = await ref(storage, `postImage/${uniquePostId}`).put(file);
      console.log("data", data);
  };

  const sendPhoto = () => {
    // uploadPhotoToServer();
    // console.log(' navigation.navigate',  navigation)
    navigation.navigate("HomeScreen",  { photo });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("status", status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Camera style={styles.camera} ref={(ref)=>setCamera(ref)}>
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image
                source={{ uri: photo }}
                style={{ height: 80, width: 100 }}
              />
            </View>
          )}
          <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
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
            placeholder="Название..."
          />
          <TextInput
            style={{ ...styles.input, marginTop: 32 }}
            placeholder="Местность..."
          />
        </View>
        <TouchableOpacity onPress={sendPhoto} activeOpacity={0.8}>
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
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderColor: "red",
    borderWidth: 1,
    height: 80,
    width: 100,
  },
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

// // Create a reference with an initial file path and name
// // Создайте ссылку с исходным путем и именем файла
// 

    // try {
    // const { uri } = await camera.takePictureAsync();

    // console.log("camera", uri);
    // const location = await Location.getCurrentPositionAsync();
    // console.log("latitude", location.coords.latitude);
    // console.log("longitude", location.coords.longitude);
    // setPhoto(uri);
    // console.log("photoUri", uri);
    // } catch (error) {
    //   console.log(error);
    // }

export default CreateScreen;
