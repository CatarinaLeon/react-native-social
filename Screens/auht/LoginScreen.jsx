import { useState } from "react";
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

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
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
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{ ...styles.form, marginBottom: isShowKeyboard ? 0 : 0 }}
            >
              <Text style={styles.title}>Войти</Text>
              <View>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  placeholder="Адрес электронной почты"
                  onFocus={() => setIsShowKeyboard(true)}
                />
              </View>
              <View style={styles.formCont}>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  placeholder="Пароль"
                  onFocus={() => setIsShowKeyboard(true)}
                />
              </View>
              <TouchableOpacity activeOpacity={0.8} onPress={keyboardHide}>
                <Text style={styles.button}>Войти</Text>
              </TouchableOpacity>
              <View>
                <Text style={styles.btn}>
                  Нет аккаунта?{" "}
                  <Text
                    style={styles.btnText}
                    onPress={() => navigation.navigate("Register")}
                  >
                    Зарегистрироваться
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
    paddingBottom: 132,
    paddingTop: 32,
    marginBottom: 0,
  },

  title: {
    marginBottom: 33,
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
});
