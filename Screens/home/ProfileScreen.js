import {useEffect,useState} from "react";
import { View, Text, StyleSheet, Button,ImageBackground,FlatList, Image,TouchableOpacity,ScrollView } from "react-native";
// import {  } from "react-native-web";
import { useDispatch,useSelector } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { Feather, Ionicons, FontAwesome } from "@expo/vector-icons";
import { collection, query, where, getDocs, onSnapshot,docs } from "firebase/firestore";
import {db} from "../../firebase/config";
// import { map } from "@firebase/util";

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const { userId, nickName } = useSelector((state) => state.auth);
  // console.log('userPost', userPosts)
  
  const getUserPosts = async () => { 
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
      setUserPosts(querySnapshot.docs.map((doc)=>{return {...doc.data()}}));
    // });
  }

useEffect(() => {
getUserPosts()
}, [])


  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <ImageBackground  style={styles.image}
          source={require("../../assets/images/PhotoBG.jpg")}>
      <View style={styles.form}>
          <View style={styles.photo}>
        <TouchableOpacity activeOpacity={0.9} style={styles.buttonDelete} onPress={signOut}>
        <Ionicons name="add-circle-outline" size={24} color="#BDBDBD" />
      </TouchableOpacity>
        </View>
          <Text style={styles.title}>{nickName}</Text>
        <TouchableOpacity activeOpacity={0.9} style={styles.button}>
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
                <Feather name="message-circle" size={18} color="#FF6C00" /> 
                <Text
                  style={styles.wrapText}
              onPress={() => navigation.navigate("Комментарии",
                // { comment: item.comment, id: item.id, uri: item.photo.localUri }
              )}
                >1
              </Text>
                  <FontAwesome name="thumbs-o-up" size={18} color="#FF6C00" />
              <Text>
                2
                  </Text>
              </View>
                <Text
                  style={styles.wrapText}
              onPress={() => navigation.navigate("Карта",
                // { location: item.location.coords }
              )}
                >
                  <Feather name="map-pin" size={18} color="#BDBDBD" />
                
                </Text>
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
    marginTop: 60,
    paddingHorizontal: 16,
    height: "100%",
  },
  buttonDelete: {
    position: 'absolute',
    top: 80,
    right:-10,
  },
  button: {
    position: 'absolute',
    right: 10,
    top:10,
  },
  photo: {
    backgroundColor: "#f6f6f6",
    width: 120,
    height: 120,
    borderRadius: 16,
    position: "absolute",
    top: -60,
    left: '37%',
    zIndex: 10,
  },
  title: {
    marginTop: 92,
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
