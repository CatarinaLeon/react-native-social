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
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    // console.log("submit", state);
    dispatch(authSignInUser(state));
    setstate(initialState);
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
                paddingBottom: isShowKeyboard ? 0 : 132,
              }}
            >
              <Text style={styles.title}>Увійти</Text>
              <View>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  placeholder="Адреса електронної пошти"
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  onChangeText={(value) =>
                    setstate((prevState) => ({ ...prevState, email: value }))
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
                    setstate((prevState) => ({ ...prevState, password: value }))
                  }
                />
              </View>
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
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 32,
    marginBottom: 0,
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
    marginTop: 43,
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
