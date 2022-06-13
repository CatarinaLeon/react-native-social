import { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import {
  StyleSheet,
  View,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
  Image
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { authSignUpUser } from "../../redux/auth/authOperations";
import { Ionicons } from "@expo/vector-icons";

const initialState = {
  nickName: "",
  email: "",
  password: "",
  avatar: 'https://i.trbna.com/preset/bi/e/92/47d9e624911ecbc6dc927ef034844.jpeg',
};

export default function RegistrationScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  console.log('state', state)

  const dispatch = useDispatch();
  
const takePhotoAvatar = async () => {
    const pickerAvatar = await ImagePicker.launchImageLibraryAsync();
    // console.log("pickerAvatar---->", pickerAvatar);
    if (pickerAvatar.cancelled === true) {
      return;
    }
    setState({...initialState, avatar: pickerAvatar.uri});
    
  }

  // const [dimensions, setdimensions] = useState(
  //   Dimensions.get("window").width - 16 * 2
  // );

  
  // useEffect(() => {
  //   const onChange = () => {
  //     const width = Dimensions.get("window").width - 16 * 2;

  //     setdimensions(width);
  //   };
  //   Dimensions.addEventListener("change", onChange);
  //   return () => {
  //     Dimensions.remove("change", onChange);
  //   };
  // }, []);

  const handleSubmit = () => {
    dispatch(authSignUpUser(state));
    setState(initialState);
  };
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/PhotoBG.jpg")}
        >
          <KeyboardAvoidingView
          // behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 0 : 66,
              }}
            >
              <View style={styles.avatarContainer}>
                <Image style={styles.avatarImg} source={{uri: state.avatar}}/>
                <TouchableOpacity activeOpacity={0.9} style={styles.avatarBtn} onPress={takePhotoAvatar}>
                  <Ionicons name={state.avatar ? "close-circle-outline" : "add-circle-outline"} size={24} color="rgba(255, 108, 0, 1)" />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Регистрация</Text>
              <View>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  placeholder="Логин"
                  autoFocus={true}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.nickName}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, nickName: value }))
                  }
                />
              </View>
              <View style={styles.formCont}>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  placeholder="Адрес электронной почты"
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={styles.formCont}>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  placeholder="Пароль"
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
              </View>
              <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit}>
                <Text style={styles.button}>Зарегистрироваться</Text>
              </TouchableOpacity>
              <View>
                <Text style={styles.btn}>
                  Уже есть аккаунт?{" "}
                  <Text onPress={() => navigation.navigate("Login")}>
                    Войти
                  </Text>
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 92,
    marginBottom: 0,
  },
  title: {
    marginBottom: 32,
    marginTop: 0,
    textAlign: "center",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",
  },
  formCont: {
    marginTop: 16,
  },
  input: {
    padding: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
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
    marginTop: 43,
    padding: 16,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
  },
  btn: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    textAlign: "center",
    marginTop: 16,
  },
  avatarContainer: {
    backgroundColor: "#f6f6f6",
    width: 120,
    height: 120,
    borderRadius: 16,
    position: "absolute",
    top: -55,
    left: '37%',
    zIndex: 20,
  },
  avatarImg: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  avatarBtn: {
    position: 'absolute',
    top: 80,
    right:-12,
  },
});
