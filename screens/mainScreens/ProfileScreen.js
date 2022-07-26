import {useEffect,useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

import { View, Text, StyleSheet, ImageBackground, FlatList, Image, TouchableOpacity, ScrollView } from "react-native";
import { Feather, Ionicons, FontAwesome } from "@expo/vector-icons";

import { collection, query, where, onSnapshot, doc, updateDoc,increment } from "firebase/firestore";
import { db } from "../../firebase/config";

const ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  // console.log('userPost', userPosts)
  
  const dispatch = useDispatch();
  
  const { userId, nickName, avatar } = useSelector((state) => state.auth);

  const getUserPosts = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    // console.log('q', q)
    await onSnapshot(q, (data) => {
      //  console.log('data', data)
      setUserPosts(data.docs.map((doc) => {
        // console.log('doc', doc.data())
        return { ...doc.data(), id: doc.id }
      }))
    });
  }

  const updateFieldLiked = async (id) => {
    const postsRef = await doc(db, `posts/${id}`);
    // console.log("postsRef", postsRef);
    await updateDoc(postsRef, {
      liked: increment(+1),
    });
  }

  useEffect(() => {
    getUserPosts()
    // console.log('getUserPosts()', getUserPosts())
  }, [userId])

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image}
        source={require("../../assets/images/PhotoBG.jpg")}>
        <View style={styles.form}>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatarImg} source={{ uri: avatar }} />
            {/* <TouchableOpacity activeOpacity={0.9} style={styles.avatarBtn}>
              <Ionicons name="add-circle-outline" size={24} color="rgba(255, 108, 0, 1)" />
            </TouchableOpacity> */}
          </View>
          <Text style={styles.titleNickName}>{nickName}</Text>
          <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={signOut}>
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <FlatList
            style={styles.flatList}
            data={userPosts}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => (
              <View style={styles.containerList}>
                <Image style={styles.imageList}
                  source={{ uri: item.photo.localUri }}
                />
                <View style={styles.containerWrap}>
                  <View style={styles.containerLike}>
                    <TouchableOpacity
                      style={styles.buttonList}
                      onPress={() => navigation.navigate("Коментарі",
                        { comment: item.comment, id: item.id, uri: item.photo.localUri, nickName: item.nickName, }
                      )}>
                      <Feather name="message-circle" size={18} color="#FF6C00" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttonList}
                      onPress={() => updateFieldLiked(item.id)}
                      disabled={item.liked >= 1}
                    >
                      <FontAwesome
                        name={item.liked === 0 ? "heart-o" : "heart"}
                        size={18}
                        color="#FF6C00"
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.buttonList}
                    onPress={() => navigation.navigate("Карта", { locationCoords: item.locationCoords })}>
                    <Feather name="map-pin" size={18} color="#BDBDBD" />
                    <Text style={styles.textListLocation}>{item.location.country}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.textLiked}>Подобається: {item.liked}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.textListNick}>{item.nickName}:</Text>
                  <Text style={styles.textListComment}>{item.comment}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    image: {
    width: "100%",
    minHeight: 680,
    backgroundPosition: "center",
    resizeMode: "cover",
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: 100,
    paddingTop: 75,
    paddingBottom:100,
    paddingHorizontal: 16,
    height: "100%",
  },
  button: {
    position: 'absolute',
    right: 10,
    top:10,
  },
  avatarContainer: {
    backgroundColor: "#f6f6f6",
    width: 120,
    height: 120,
    borderRadius: 16,
    position: "absolute",
    top: -50,
    left: '40%',
    zIndex: 10,
  },
  avatarImg: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  avatarBtn: {
    position: 'absolute',
    top: 65,
    right:6,
  },
  titleNickName: {
    marginTop: 20,
    marginBottom: 30,
    fontFamily: 'Roboto-Medium',
    fontStyle:'normal',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    letterSpacing: 0.01,
  },
    flatList: {
    paddingBottom: 64,
    borderRadius: 8,
  },
  containerList: {
      marginBottom:25,
    },
    imageList: {
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },

  containerLike: {
    width: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonList: {
    flexDirection: "row",
    height:20,
  },
  containerWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textListLocation: {
    marginLeft: 5,
    fontFamily: "Roboto-Regular",
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine:'underline',
    color: "#212121",
  },
  textLiked: {
    marginBottom: 8,
    marginTop: 5,
    fontFamily: "Roboto-Medium",
    fontStyle: 'normal',
  },
  textListNick: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  textListComment: {
    marginLeft: 5,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    },
});

export default ProfileScreen;
