import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../nestedScreens/HomeScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

const NestedScreen = createNativeStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen name="HomeScreen" component={HomeScreen} />
      <NestedScreen.Screen name="Комментарии" component={CommentsScreen} />
      <NestedScreen.Screen name="Карта" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;

