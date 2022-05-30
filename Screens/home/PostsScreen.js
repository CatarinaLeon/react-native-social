import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../nestedScreens/HomeScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";
// import { AntDesign } from '@expo/vector-icons'; 

const NestedScreen = createNativeStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator options={{}}>
      <NestedScreen.Screen name="HomeScreen" component={HomeScreen}
        options={{
          title: 'Публикации', headerTitleAlign: 'center',
          // headerBackImageSource: true,
          // headerBackImage: () => <AntDesign name="arrowleft" size={24} color="black" />,
        }}
      />
      <NestedScreen.Screen name="Комментарии" component={CommentsScreen} options={{headerTitleAlign:'center'}}/>
      <NestedScreen.Screen name="Карта" component={MapScreen} options={{headerTitleAlign:'center'}}/>
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;

