import { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  StyleSheet,
  View,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
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
  // avatar:  '../../assets/images/avatar.jpeg',
};

export default function RegistrationScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isInputStyleNick, setIsInputStyleNick] = useState(false);
  const [isInputStyleMail, setIsInputStyleMail] = useState(false);
  const [isInputStylePassword, setIsInputStylePassword] = useState(false);

  const dispatch = useDispatch();
  
const takePhotoAvatar = async () => {
    const pickerAvatar = await ImagePicker.launchImageLibraryAsync();
    // console.log("pickerAvatar---->", pickerAvatar);
    if (pickerAvatar.cancelled === true) {
      return;
    }
    setState({...initialState, avatar: pickerAvatar.uri});
  }

  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  
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
      {/* <KeyboardAwareScrollView> */}
        <View style={styles.container}>
          <ImageBackground
            style={{ ...styles.image }}
            source={require("../../assets/images/PhotoBG.jpg")}
          >
            <View style={{ ...styles.form, paddingBottom: isShowKeyboard ? 280 : 150 }}>
              <View style={styles.avatarContainer}>
                <Image style={styles.avatarImg} source={{ uri: state.avatar }} />
                <TouchableOpacity activeOpacity={0.9} style={styles.avatarBtn} onPress={takePhotoAvatar}>
                  <Ionicons name="add-circle-outline" size={24} color="rgba(255, 108, 0, 1)" />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Реєстрація</Text>
              <TextInput
                style={{
                  ...styles.input, marginBottom: 16,
                  borderColor: isInputStyleNick ? '#FF6C00' : '#E8E8E8'
                }}
                placeholder="Логін"
                // autoFocus={true}
                selectTextOnFocus={true}
                onFocus={() => { setIsInputStyleNick(true); setIsShowKeyboard(true) }}
                onBlur={() => setIsInputStyleNick()}
                value={state.nickName}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, nickName: value }))
                }
              />
              <TextInput
                style={{ ...styles.input, marginBottom: 16, borderColor: isInputStyleMail ? '#FF6C00' : '#E8E8E8' }}
                placeholder="Адреса електронної пошти"
                onFocus={() => { setIsInputStyleMail(true); setIsShowKeyboard(true) }}
                onBlur={() => setIsInputStyleMail()}
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              />
              <TextInput
                style={{ ...styles.input, borderColor: isInputStylePassword ? '#FF6C00' : '#E8E8E8' }}
                placeholder="Пароль"
                secureTextEntry={true}
                onFocus={() => { setIsInputStylePassword(true); setIsShowKeyboard(true) }}
                onBlur={() => setIsInputStylePassword()}
                value={state.password}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
              />
              <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit}>
                <Text style={styles.button}>Зареєструватись</Text>
              </TouchableOpacity>
              <Text style={styles.btn}>
                Вже є обліковий запис?{" "}
                <Text onPress={() => navigation.navigate("Login")}>
                  Увійти
                </Text>
              </Text>
            </View>
          </ImageBackground>
        </View>
      {/* </KeyboardAwareScrollView> */}
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    minHeight: 800,
    resizeMode: "center",
    justifyContent:'flex-end',
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 90,
    paddingBottom: 50,
  },
  title: {
    marginBottom: 32,
    marginTop: 0,
    textAlign: "center",
    fontFamily: "Roboto-Bold",
    fontStyle: "normal",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",
  },
  input: {
    padding: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    textAlign: "center",
    marginHorizontal: 16,
    marginTop: 40,
    padding: 16,
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
  },
  btn: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
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
    top: '-14%',
    left: '34%',
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
