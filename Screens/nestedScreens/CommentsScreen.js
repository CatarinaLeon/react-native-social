import { View, Text, StyleSheet,TextInput, TouchableOpacity,Image } from "react-native";
import { useSelector } from 'react-redux'
import{useState}from 'react'
import { db } from '../../firebase/config'
// import { collection } from "firebase/firestore";
import { collection, addDoc,doc, setDoc } from "firebase/firestore";
// import { async } from "@firebase/util";

const CommentsScreen = ({ route }) => {
  const  postId  = route.params;
  console.log('postId', postId)
  const [comment, setComment] = useState('')
  console.log('comment', comment)
  const { nickName } = useSelector((state) => state.auth)

  const createPost = async () => {
    // const d= collection(db,"posts")
    // const data = await setDoc(doc(d,'comments'), { comment: comment, nickName: nickName })
     const data = addDoc(collection(db, 'posts' ,"comments"), { comment, nickName });
    // const createPost = await addDoc(collection(db, 'posts'))
    // const data =
      // collection(db,"posts",doc(postId).
      
      // await doc(db, 'posts').addDoc(collection(db, 'comments'), { comment: comment, nickName: nickName })
    console.log('data', data)
  }

  //    const uploadPostToServer = async () => {
  //   const photo = await uploadPhotoToServer();
  //   const createPost = await addDoc(collection(db, 'posts'), {
  //     photo: photo,
  //     comment: comment,
  //     location: location.coords,
  //     userId: userId,
  //     nickName: nickName,
  //   }) 
  //   console.log('createPost', createPost)
  // };
    return (
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          <Image/>
        </View>
        <View >
          <Image />
      <TextInput style={styles.input} onChangeText={setComment}/>
    </View>
    <TouchableOpacity onPress={createPost} style={styles.sendBtn}>
      <Text>add</Text>
    </TouchableOpacity>
  </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor:'#FFFFFF',
    
    // justifyContent: "center",
    // alignItems: "center",
  },
  photoContainer: {
    borderColor: "red",
    borderWidth: 1,
    height: 240,
    borderRadius: 8,
    marginBottom:32,
    // width: 150,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#20b2aa",
  },
  sendBtn: {
    marginHorizontal: 30,
    height: 40,
    borderWidth: 2,
    borderColor: "#20b2aa",
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
});

export default CommentsScreen;
