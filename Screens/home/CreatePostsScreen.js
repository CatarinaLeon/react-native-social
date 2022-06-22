import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
import * as Location from "expo-location";
import { FontAwesome, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc, setDoc, doc,query } from "firebase/firestore"; 
import {storage, db} from "../../firebase/config";


const CreateScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(null);
  const [coords, setCoords] = useState(null)
  // console.log('photo=>', photo)
  // console.log('comment=>', comment)
  // console.log('location=>', location)
  console.log('coords=>', coords)

  // const text = JSON.stringify(location);
  //     console.log('text', text)
  
  const { userId, nickName, email, avatar} = useSelector((state) => state.auth);

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Требуется разрешение на доступ к фотопленке!");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    // console.log("pickerResult---->", pickerResult);
    if (pickerResult.cancelled === true) {
      return;
    } 
    setPhoto({ localUri: pickerResult.uri });
    
  }
  //   if (photo !== null) {
  //   return (
  //     <View style={styles.containerPhoto}>
  //       <Image
  //         source={{ uri: photo.localUri }}
  //         style={styles.thumbnail}
  //       />
  //     </View>
  //   );
  // }

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.getCameraPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //     console.log('status', status)
  //   })();
  // }, []);

  // if (hasPermission === null) {
  //   return <View />;
  // }
  // if (hasPermission === false) {
  //   return <Text>Нет доступа к камере</Text>;
  // }

  // const takePhoto = async () => {
  //   // const { uri } = await FileSystem.getInfoAsync()
  //   console.log('uri', FileSystem.readAsStringAsync())
  //   // const { uri } = await camera.takePictureAsync();
  //   // const location = await Location.getCurrentPositionAsync();
  //     // console.log('Camera.takePictureAsync()----->',camera.takePictureAsync())
  //   // setPhoto(uri)
  // }

  
  // Створення колекції Post
    const uploadPostToServer = async () => {
      await uploadPhotoToServer();
      const postsRef = doc(collection(db, 'posts'))
      // console.log('postsRef', postsRef.id)
      await setDoc(postsRef, {
        photo: photo,
        comment: comment,
        location: location,
        locationCoords: coords,
        userId: userId,
        nickName: nickName,
        email: email,
        avatar: avatar,
        liked: Number(),
    }) 
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo.localUri);
    // console.log('response=>', response)
    const file = await response.blob();
    // console.log('file=>', file)
    // const uniquePostId = Date.now().toString();
    const storageRef = await ref(storage, 'postImage/'+ file.data.name)
    // console.log('storageRef', storageRef)
    // const uploadTask =
      await uploadBytesResumable(storageRef, file);
    // console.log("uploadTask", uploadTask);
    const processedPhoto = await getDownloadURL(storageRef)
    // console.log('processedPhoto', processedPhoto)
    return processedPhoto;
  };


  const sendPhoto = () => {
    uploadPostToServer();
    // console.log(' navigation.navigate',  navigation)
    navigation.navigate("PostsScreen");
  };
  
    useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Разрешение на доступ к местоположению было отклонено");
      }
      const locationCoords = await Location.getCurrentPositionAsync({});
      // console.log('locationCoords=>', locationCoords)
      setCoords(locationCoords)
      const location = await Location.reverseGeocodeAsync(locationCoords.coords)
      // console.log('location=>', location[0])
      setLocation(location[0]);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Camera style={styles.camera} ref={setCamera}
        type={type}
        >
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image
                source={{ uri: photo.localUri }}
                style={{ height: 200, width: 150 }}
              />
            </View>
          )}
          <TouchableOpacity
            // onPress={takePhoto}
            style={styles.snapContainer}
          >
            <FontAwesome
              style={styles.snap}
              name="camera"
              size={24}
              color="#BDBDBD"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cameraType}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <MaterialCommunityIcons
                // style={s.snap}
                name="camera-retake-outline"
                size={34}
                color="#E8E8E8"
              />
            </TouchableOpacity>
        </Camera>
        <TouchableOpacity onPress={openImagePickerAsync}>
          <Text style={styles.photo}>Завантажити фото</Text>
        </TouchableOpacity>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Назва..."
            onChangeText={setComment}
          />
          <TextInput
            style={{ ...styles.input, marginTop: 32 }}
            placeholder="Місцевість..."
            onChangeText={setLocation}
          />
        </View>
        <TouchableOpacity onPress={sendPhoto} activeOpacity={0.8}>
          <Text style={styles.button}>Опублікувати</Text>
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
  containerPhoto: {
    height:300,
  },
    thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },
  camera: {
    height: 240,
    marginHorizontal: 16,
    marginTop: 32,
    
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  cameraType: {
    position: 'absolute',
    top: 10,
    right:10,
    zIndex:20,
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderColor: "red",
    borderWidth: 1,
    height: 200,
    width: 150,
  },
  snapContainer: {
    borderWidth: 1,
    backgroundColor: "#f6f6f6",
    top: '35%',
    left:'40%',
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
