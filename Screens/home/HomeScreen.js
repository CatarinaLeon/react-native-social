import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostsScreen from "../nestedScreens/PostsScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";
// import { AntDesign } from '@expo/vector-icons'; 

const NestedScreen = createNativeStackNavigator();

const HomeScreen = () => {
  return (
    <NestedScreen.Navigator options={{}}>
      <NestedScreen.Screen name="PostsScreen" component={PostsScreen}
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

export default HomeScreen;

