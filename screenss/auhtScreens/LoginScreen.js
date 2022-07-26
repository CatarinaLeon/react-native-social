import { useState } from "react";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";
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
  useWindowDimensions
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isInputStyleMail, setIsInputStyleMail] = useState(false);
  const [isInputStylePassword, setIsInputStylePassword] = useState(false);

  const dispatch = useDispatch();

  const screenHeight = useWindowDimensions().height;

  const handleSubmit = () => {
    // console.log("submit", state);
    dispatch(authSignInUser(state));
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
            style={{...styles.image, height: (screenHeight + 120)}}
            source={require("../../assets/images/PhotoBG.jpg")}
          >
            <KeyboardAvoidingView>
              <View style={{...styles.form,paddingBottom: isShowKeyboard ? 350 : 250}} >
                <Text style={styles.title}>Увійти</Text>
                <TextInput
                  style={{ ...styles.input, marginBottom: 16, borderColor: isInputStyleMail ? '#FF6C00' : '#E8E8E8' }}
                  textAlign={"center"}
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
                  textAlign={"center"}
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
                  <Text style={styles.button}>Увійти</Text>
                </TouchableOpacity>
                <View>
                  <Text style={styles.btn}>
                    Немає облікового запису?{" "}
                    <Text
                      style={styles.btnText}
                      onPress={() => navigation.navigate("Register")}
                    >
                      Зареєструватись
                    </Text>
                  </Text>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ImageBackground>
        </View>
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
    justifyContent:'flex-end',
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 32,
  },

  title: {
    marginBottom: 33,
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
    borderColor: "#E8E8E8",
    textAlign: "left",
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
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
});
