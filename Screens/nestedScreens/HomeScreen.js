import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useSelector } from 'react-redux'
import { collection, getDocs } from "firebase/firestore"; 
import {db} from "../../firebase/config";
import { Feather } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { nickName,email } = useSelector((state) => state.auth)
  console.log('setPosts', posts)
  
  const getAllPost = async () => {
    const data = await getDocs(collection(db, 'posts'))
    // console.log('data', data)
    setPosts(
      data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  };
    useEffect(() => {
      getAllPost()
    }, []);
  
    return (
      <View style={styles.container}>
        <View style={styles.containerImage}>
          {/* <Image style={styles.image} /> */}
          <View>
            <Text style={styles.imageText}>{nickName}</Text>
            <Text
              style={{
                ...styles.imageText,
                fontWeight: "normal",
                color: "rgba(33, 33, 33, 0.8)",
              }}
            >
              {email}
            </Text>
          </View>
        </View>
        <FlatList
          style={styles.flatList}
          data={posts}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View style={styles.containerList}>
              <Image style={styles.imageList} source={{ uri: item.photo.localUri }} />
              <Text style={styles.textList}>{item.comment}</Text>
              <View style={styles.containerWrap}>
                <Text
                  style={styles.wrapText}
                  onPress={() => navigation.navigate("Комментарии", { comment: item.comment, id: item.id, uri: item.photo.localUri })}
                >
                  <Feather name="message-circle" size={18} color="#BDBDBD" /> 1
                </Text>
                <Text
                  style={styles.wrapText}
                  onPress={() => navigation.navigate("Карта", { location: item.location.coords })}
                >
                  <Feather name="map-pin" size={18} color="#BDBDBD" />
                  { item.location.coords.latitude}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor:"#FFFFFF",
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
  },
  imageList: {
    height: 200,
    borderRadius: 8,
    // borderWidth: 1,
    // borderColor: "red",
    marginBottom: 8,
  },
  textList: {
    marginBottom: 11,
    fontFamily: "Roboto",
    fontStyle: "normal",
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
