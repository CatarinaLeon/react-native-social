import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";

import { collection, onSnapshot,query, where } from "firebase/firestore"; 
import { db } from "../../firebase/config";

import { Feather } from "@expo/vector-icons";

const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  // console.log('posts', posts)
  const { nickName, email, avatar, userId } = useSelector((state) => state.auth)

  const getAllPost = async () => {
    // Прослуховувати документ за допомогою onSnapshot()
    const q = await query(collection(db, "posts")
      // , where("email", "==", email)
    );
    await onSnapshot(q, (data) => {
      setPosts(
        data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
    // Отримати дані один раз =>
    // const data = await getDocs(collection(db, 'posts'))
    // console.log('data', data)
    // setPosts(
    //   data.docs.map((doc) => {
    //     return { ...doc.data(), id: doc.id };
    //   })
    // );
  };

  useEffect(() => {
    getAllPost()
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image style={styles.image} source={{ uri: avatar }} />
        <View>
          <Text style={styles.imageTextNick}>{nickName}</Text>
          <Text style={styles.imageTextEmail}>{email}</Text>
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
              <TouchableOpacity
                style={styles.containerWrap}
                onPress={() => navigation.navigate("Коментарі",
                  { comment: item.comment, id: item.id, uri: item.photo.localUri, nickName: item.nickName })}>
                <Feather name="message-circle" size={18} color="#BDBDBD" />
                <Text style={{ ...styles.wrapText, marginLeft: 5, textDecorationLine:'none' }}>Коментарі</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.containerWrap}
                onPress={() => navigation.navigate("Карта", { locationCoords: item.locationCoords })}>
                <Feather name="map-pin" size={16} color="#BDBDBD" />
                <Text style={{ ...styles.wrapText, marginLeft: 5 }}>{item.location.city}, {item.location.country}</Text>
              </TouchableOpacity>
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
  },
  imageTextNick: {
    fontFamily: "Roboto-Bold",
    fontStyle: "normal",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  imageTextEmail: {
    fontFamily: 'Roboto-Regular',
    fontStyle: "normal",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  // flatList: {},
  containerList: {
    marginBottom: 34,
    borderRadius: 8,
  },
  imageList: {
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  textList: {
    marginBottom: 11,
    fontFamily: "Roboto-Medium",
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
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine:'underline',
    color: "#212121",
  },
});

export default PostsScreen;
