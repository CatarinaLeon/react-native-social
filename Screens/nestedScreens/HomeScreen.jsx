import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

const HomeScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  console.log("route.params", route.params);

  useEffect(() => {
    try {
      if (route.params) {
        setPosts((prevState) => [...prevState, route.params]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [route.params]);
  console.log("posts", posts);

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image style={styles.image} />
        <View>
          <Text style={styles.imageText}>Natali Romanova</Text>
          <Text
            style={{
              ...styles.imageText,
              fontWeight: "normal",
              color: "rgba(33, 33, 33, 0.8)",
            }}
          >
            email@example.com
          </Text>
        </View>
      </View>
      <FlatList
        style={styles.flatList}
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.containerList}>
            <Image style={styles.imageList} source={{ uri: item.photo }} />
            <Text style={styles.textList}>Лес</Text>
            <View style={styles.containerWrap}>
              <Text
                style={styles.wrapText}
                onPress={() => navigation.navigate("Комментарии")}
              >
                <Feather name="message-circle" size={18} color="#BDBDBD" /> 1
              </Text>
              <Text
                style={styles.wrapText}
                onPress={() => navigation.navigate("Карта")}
              >
                <Feather name="map-pin" size={18} color="#BDBDBD" />{" "}
                Ivano-Frankivs'k Region, Ukraine
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 32,
    marginHorizontal: 16,
  },
  containerImage: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "red",
  },
  imageText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  // flatList: {},
  containerList: {
    marginBottom: 34,
    borderRadius: 8,
    // borderWidth: 1,
    // borderColor: "red",
  },
  imageList: {
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "red",
    marginBottom: 8,
  },
  textList: {
    marginBottom: 11,
    fontFamily: "Roboto",
    fontStyle: "normal",
    // fontWeight: "medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  containerWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrapText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
});

export default HomeScreen;
