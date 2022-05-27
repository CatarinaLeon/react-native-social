import { View, Text, StyleSheet,TextInput, TouchableOpacity,Image,SafeAreaView,
  FlatList, ScrollView } from "react-native";
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { db } from '../../firebase/config'
// import { collection } from "firebase/firestore";
import { collection, addDoc,doc, setDoc,query,getDocs,get } from "firebase/firestore";
// import { async } from "@firebase/util";

const CommentsScreen = ({ route}) => {
  const { id,uri } = route.params
  // const{photo.localUri}=route.params
  console.log('id', uri)
  const [comment, setComment] = useState('')
  // console.log('comment=>', comment)
  const [allComments, setAllComments] = useState([]);
  // console.log('allComments=>', allComments)
  const { nickName } = useSelector((state) => state.auth)

  const createPost = async () => {
      const createCom = await doc(collection( db,`posts/${id}/comments`))
    // console.log('createPost', createCom)
    await setDoc(createCom, {
      comment: comment,
      nickName: nickName,
    }) 
  }

  // const createPost = async () => {
  //   const q = query(collection(db, "posts"));
  //   // console.log('q=>', q)
  //   const querySnapshot = await getDocs(q);
  //   // console.log('querySnapshot=>', querySnapshot)
  //       const queryData = querySnapshot.docs.map((detail) => ({
  //           ...detail.data(),
  //           id: detail.id,
  //       }));
  //     console.log('queryData=>', queryData)
  //   const data = queryData.map(async (v) => {
  //           await setDoc(doc(db, `posts/${v.id}/comments`,comment), {
  //             comment: comment, nickName: nickName
  //           });
  //   })
  //   console.log('data=>', data)
  // }

  const getAllPosts = async () => {
      const data = await getDocs(collection( db,`posts/${id}/comments`))
    // console.log('createPost', data)
      setAllComments(
        data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
  };

  useEffect(() => {
    getAllPosts();
  }, []);

    return (
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          <Image
            style={styles.commentPhoto}
            source={{ uri }} />
        </View>
        <FlatList 
          style={styles.flatList}
          data={allComments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <>
          <View style={styles.commentContainer}>
            <Text style={styles.commentNick}>{nickName}</Text>
              <View style={styles.commentContText}>
                <Text style={styles.commentText}>{item.comment}</Text>
                <Text style={styles.commentData}>26.05.22</Text>
              </View>
              </View>
              
            </>
          )}
        />
        <View >
          <TextInput style={styles.input} placeholder="Комментировать..." onChangeText={setComment}/>
          <TouchableOpacity onPress={createPost} style={styles.sendBtn}>
            <AntDesign name="arrowup" size={20} color="#FFFFFF" />
            {/* <Feather name="send" size={17} color="" /> */}
          </TouchableOpacity>
        </View>
  </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor:'#FFFFFF',
  },
  photoContainer: {
    // borderColor: "red",
    // borderWidth: 1,
    height: 240,
    borderRadius: 8,
  },
  commentPhoto: {
    height: 240,
    borderRadius: 8,
  },
  // flatList: {
  //   // paddingTop: 32,
  //   paddingBottom:32,
  // },
  input: {
    marginTop:16,
    padding:16,
    height: 50,
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor:'#F6F6F6',
    borderColor: "#E8E8E8",
  },
  sendBtn: {
    position: 'absolute',
    bottom: 7,
    left:333,
    height: 35,
    width: 35,
    backgroundColor:'#FF6C00',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  commentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  commentNick: {
    marginRight:16,
    height: 28,
    width: 28,
    borderWidth: 1,
    borderRadius:50,
    borderColor: 'red',
  },
  commentContText: {
    width:330,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius:6,
  },
  // commentText: {
  //   borderWidth: 1,
  //   borderColor: 'red',
  // },
  commentData: {
    textAlign: 'right',
    marginTop: 8,
    fontSize: 10,
    lineHeight: 12,
    color:"#BDBDBD",
  },
});

export default CommentsScreen;
