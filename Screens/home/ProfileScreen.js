import {useEffect,useState} from "react";
import { View, Text, StyleSheet, Button,ImageBackground,FlatList, Image,TouchableOpacity,ScrollView } from "react-native";
// import {  } from "react-native-web";
import { useDispatch,useSelector } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { Feather, Ionicons, FontAwesome } from "@expo/vector-icons";
import { collection, query, where, getDocs, onSnapshot,docs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  // console.log('userPost', userPosts)
  const [liked, setLiked] = useState(0);
  // console.log('liked', liked)

  const { userId, nickName, avatar} = useSelector((state) => state.auth);

  const getUserPosts = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    await onSnapshot(q, (data) => {
      setUserPosts(data.docs.map((doc) => { return { ...doc.data() } }))
    });
  }

  // const getCurrentUserPost = async () => {
  //     const postsRef = query(collection(db, 'posts')) 
  //     await updateDoc(postsRef, {
  //       avatar: avatar,
  // });
  
  // }
  
  useEffect(() => {
    getUserPosts()
    // console.log('getUserPosts()', getUserPosts())
  }, [])

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image}
        source={require("../../assets/images/PhotoBG.jpg")}>
        <View style={styles.form}>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatarImg} source={{uri: avatar}}/>
            <TouchableOpacity activeOpacity={0.9} style={styles.avatarBtn}>
              <Ionicons name="add-circle-outline" size={24} color="rgba(255, 108, 0, 1)" />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{nickName}</Text>
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
                <Text style={styles.textList}>{item.comment}</Text>
                <View style={styles.containerWrap}>
                  <View style={styles.containerLike}>
                    <TouchableOpacity
                      style={styles.buttonLike}
                      onPress={() => navigation.navigate("Комментарии",
                      { comment: item.comment, id: item.id, uri: item.photo.localUri }
                    )}>
                      <Feather name="message-circle" size={18} color="#FF6C00" />
                      <Text style={{...styles.wrapText, marginLeft:5}}>{item.like ? item.like : 0}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttonLike}
                      // onPress={()=>getCurrentUserPost(item.id)}
                    >
                      <FontAwesome
                        name="thumbs-o-up"
                        size={18}
                        color="#FF6C00" />
                      <Text style={{marginLeft:5}}>{item.liked ? item.liked : 0}</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => navigation.navigate("Карта", { location: item.location.coords })}>
                    <Feather name="map-pin" size={18} color="#BDBDBD" />
                    <Text style={styles.wrapText} >
                      {/* {item.location} */}
                    </Text>
                  </TouchableOpacity>
                  
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
    height: "100%",
    backgroundPosition: "center",
    resizeMode: "cover",
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: 100,
    paddingTop:90,
    paddingHorizontal: 16,
    height: "100%",
  },
  button: {
    position: 'absolute',
    right: 10,
    top:10,
  },
  avatarContainer: {
    // backgroundColor: "#f6f6f6",
    width: 120,
    height: 120,
    borderRadius: 16,
    position: "absolute",
    top: -50,
    left: '40%',
    zIndex: 10,
  },
  avatarImg: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  avatarBtn: {
    position: 'absolute',
    top: 65,
    right:6,
  },
  title: {
    marginTop: 0,
    marginBottom: 33,
    textAlign: 'center',
    // fontWeight: 500,
    fontSize: 30,
    lineHeight:35,
  },
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
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  containerLike: {
    width:80,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonLike: {
    flexDirection: "row",
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

export default ProfileScreen;
