import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { View,Text,StyleSheet,TouchableOpacity,TextInput,
  Image,Modal,useWindowDimensions } from "react-native";
  
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
import * as Location from "expo-location";
import { FontAwesome, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, setDoc, doc } from "firebase/firestore"; 
import {storage, db} from "../../firebase/config";


const CreateScreen = ({ navigation }) => {
  const cameraRef = useRef();
  // const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(null);
  const [coords, setCoords] = useState(null)
  const [modalVisible, setModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  // console.log('photo=>', photo)
  
  const screenHeight = useWindowDimensions().height;

  const { userId, nickName, email, avatar } = useSelector((state) => state.auth);

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
    setModalVisible(true);
  }

  const takePhoto = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    const newPhoto = await cameraRef.current.takePictureAsync(options);
    console.log('newPhoto', newPhoto)
    setPhoto({ localUri: newPhoto.uri });
  };

  // Створення колекції Post
  const uploadPostToServer = async () => {
    await uploadPhotoToStorage();
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

  const uploadPhotoToStorage = async () => {
    // setModalVisible(!modalVisible);
    const response = await fetch(photo.localUri);
    // console.log('response=>', response)
    const file = await response.blob();
    // console.log('file=>', file)
    // const uniquePostId = Date.now().toString();
    const storageRef = await ref(storage, 'postImage/' + file.data.name)
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
    setComment()
    setPhoto()
    setModalVisible()
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
  
  const handleDeleteButton = () => {
    setComment()
    setPhoto()
    setModalVisible()
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      console.log('status', status)
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>Нет доступа к камере</Text>;
  }

  return (
    <View style={styles.container}>
      {!modalVisible ? (
        <>
          <Camera style={styles.camera}
            // ref={(ref) => setPhoto(ref)}
            ref={cameraRef}
            type={type}
          >
            <TouchableOpacity
              onPress={takePhoto}
              style={styles.buttonSnap}
            >
              <FontAwesome
                name="camera"
                size={24}
                color="#BDBDBD"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cameraType}
              onPress={() => {
                setType(
                  type === CameraType.back
                    ? CameraType.front
                    : CameraType.back
                );
              }}
            >
              <MaterialCommunityIcons
                name="camera-retake-outline"
                size={34}
                color="#E8E8E8"
              />
            </TouchableOpacity>
          </Camera>
          <TouchableOpacity onPress={openImagePickerAsync}>
            <Text style={styles.buttonDownload}>Завантажити фото</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => { Alert.alert("Modal has been closed.") }}
        >
          <>
            <View style={styles.takePhotoContainer}>
              {photo && (
                <View style={{ height: (screenHeight - 400) }}>
                  <Image
                    source={{ uri: photo.localUri }}
                    style={{ height: (screenHeight - 400), width: 'auto' }}
                  />
                </View>
              )}
            </View>
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                value={comment}
                placeholder="Назва..."
                onChangeText={setComment}
              />
            
              <TouchableOpacity onPress={sendPhoto} activeOpacity={0.8}
                disabled={comment ? false : true}
              >
                <Text
                  style={{
                    ...styles.buttonPublish,
                    backgroundColor: comment ? '#FF6C00' : "#F6F6F6",
                    color: comment ? '#FFFFFF' : "#BDBDBD",
                  }}
                >Опублікувати</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.9} style={styles.buttonDelete}
                onPress={handleDeleteButton}
              >
                <AntDesign name="close" size={24} color="#DADADA" />
              </TouchableOpacity>
            </View>
          </>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  camera: {
    flex:1,
    marginHorizontal: 16,
    marginTop: 32,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  buttonSnap: {
    borderWidth: 1,
    backgroundColor: "#f6f6f6",
    top: '40%',
    left:'42%',
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraType: {
    position: 'absolute',
    top: 10,
    right:10,
    zIndex:20,
  },
  takePhotoContainer: {
    marginHorizontal: 16,
    marginTop: 80,
  },
  buttonDownload: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom:20,
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  formContainer: {
    marginTop: 32,
  },
  input: {
    marginHorizontal: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    padding: 10,
    textAlign: "left",
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  buttonPublish: {
    borderRadius: 100,
    textAlign: "center",
    marginHorizontal: 16,
    marginTop: 32,
    padding: 16,
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
  },
  buttonDelete: {
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    padding: 8,
    width: 70,
    marginTop:20,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
});


export default CreateScreen;
