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

export default function RegistrationScreen({ navigation }) {
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
              <View style={styles.photo}></View>
              <Text style={styles.title}>Регистрация</Text>
              <View style={styles.formCont}>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  placeholder="Логин"
                  autoFocus={true}
                  onFocus={() => setIsShowKeyboard(true)}
                />
              </View>
              <View style={styles.formCont}>
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
    // backgroundPosition: "center",
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingBottom: 66,
    paddingTop: 60,
    marginBottom: 0,
  },
  photo: {
    backgroundColor: "#f6f6f6",
    width: 120,
    height: 120,
    borderRadius: 16,
    position: "absolute",
    top: -60,
    left: 130,
    zIndex: 10,
  },

  title: {
    marginBottom: 33,
    marginTop: 32,
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
