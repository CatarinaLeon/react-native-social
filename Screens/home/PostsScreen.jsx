import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

const PostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  // console.log("route.params", route.params);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  // console.log("posts", posts);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "red",
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{
                width: 350,
                height: 200,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "red",
              }}
            />
            <Text style={{ textAlign: "left" }}>Лес</Text>
            <View
              style={{
                display: 1,
              }}
            >
              <View
              // onPress={() => navigation.navigate("Map")}
              >
                <Feather name="message-circle" size={24} color="black" />
                <Text>0</Text>
              </View>
              <View
              // onPress={() => navigation.navigate("Map")}
              >
                <Feather name="map-pin" size={24} color="black" />
                <Text>Ivano-Frankivs'k Region, Ukraine</Text>
              </View>
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
    justifyContent: "center",
    // alignItems: "center",
  },
});

export default PostsScreen;
