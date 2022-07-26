import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { View, Text, StyleSheet,TextInput, TouchableOpacity,Image,useWindowDimensions,
  FlatList} from "react-native";

import { db } from '../../firebase/config'
import { collection, doc, setDoc, query, onSnapshot } from "firebase/firestore";

import { AntDesign } from '@expo/vector-icons';

const CommentsScreen = ({ route }) => {
  const { id, comment, nickName } = route.params
  // console.log('id', id)

  const screenWidth = useWindowDimensions().width;
  
  const [comments, setComments] = useState('')
  const [allComments, setAllComments] = useState([]);

  const { avatar } = useSelector((state) => state.auth)

  const nowDate = new Date().toLocaleDateString();
  // console.log(nowDate);

  const createCommentsOnPosts = async () => {
    const createComments = await doc(collection(db, `posts/${id}/comments`))
    // console.log('createComments', createComments)
    await setDoc(createComments, {
      comment: comments,
      avatar: avatar,
      date: nowDate,
    })
  }

  const handleSubmit = () => {
    createCommentsOnPosts();
    setComments()
  };

  const getAllPosts = async () => {
    // const q = await getDocs(collection(db, `posts/${id}/comments`))
    const q = await query(collection(db, `posts/${id}/comments`));
    await onSnapshot(q, (data) => {
      // console.log('data', data)
      setAllComments(
        data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    })
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <Text style={styles.commentPhotoText}>{nickName}:</Text>
        <Text style={{ ...styles.commentPhotoText, marginLeft: 8, }}>{comment}</Text>
      </View>
      {allComments.length === 0 ? (
        <Text style={styles.textComment}>Коментарів поки немає</Text>
      ) : (
        <FlatList
          style={styles.flatList}
          data={allComments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <>
              <View style={styles.commentContainer}>
                <Image style={styles.commentAvatar} source={{ uri: item.avatar }} />
                <View style={{ ...styles.commentContText, width: screenWidth - 75 }}>
                  <Text style={styles.commentText}>{item.comment}</Text>
                  <Text style={styles.commentData}>{item.date}</Text>
                </View>
              </View>
            </>
          )}
        />)}
      <View >
        <TextInput style={styles.input}
          value={comments}
          placeholder="Коментувати..."
          onChangeText={setComments} />
        <TouchableOpacity onPress={handleSubmit} style={{ ...styles.sendBtn, left: screenWidth - 80 }}>
          <AntDesign name="arrowup" size={20} color="#FFFFFF" />
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
    flexDirection: 'row',
  },
  textComment: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontSize: 22,
    lineHeight: 18,
    color: "#BDBDBD",
    textAlign: 'center',
    padding: 60,
  },
  commentPhotoText: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  flatList: {
    marginTop:20,
  },
  input: {
    position:'relative',
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
  commentAvatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  commentContText: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius:6,
  },
  commentText: {
    fontFamily: 'Roboto-Regular',
    fontStyle: 'normal',
    fontSize: 13,
    lineHeight: 18,
    color:'#212121',
  },
  commentData: {
    marginTop: 8,
    fontFamily:'Roboto-Regular',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'right',
    color:"#BDBDBD",
  },
});

export default CommentsScreen;
