import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostsScreen from "../nestedScreens/PostsScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

const NestedScreen = createNativeStackNavigator();

const HomeScreen = () => {
  return (
    <NestedScreen.Navigator options={{}}>
      <NestedScreen.Screen name="PostsScreen" component={PostsScreen}
        options={{title: 'Публікації', headerTitleAlign: 'center'}}
      />
      <NestedScreen.Screen name="Коментарі" component={CommentsScreen} options={{headerTitleAlign:'center'}}/>
      <NestedScreen.Screen name="Карта" component={MapScreen} options={{headerTitleAlign:'center'}}/>
    </NestedScreen.Navigator>
  );
};

export default HomeScreen;

