import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegistrationScreen from "../Screens/auht/RegistrationScreen";
import LoginScreen from "../Screens/auht/LoginScreen.jsx";
import PostsScreen from "../Screens/home/PostsScreen.jsx";
import CreateScreen from "../Screens/home/CreatePostsScreen.jsx";
import ProfileScreen from "../Screens/home/ProfileScreen.jsx";

import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Image } from "react-native";

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color, backgroundColor }) => (
            <SimpleLineIcons
              name="grid"
              size={20}
              color={color}
              //   focused={focused}
              //   backgroundColor={"#FF6C00"}
            />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name="add"
              size={24}
              color={color}
              //   backgroundColor={"#FF6C00"}
            />
          ),
        }}
        name="Создать публикацию"
        component={CreateScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather
              name="user"
              size={24}
              color={color}
              //   backgroundColor={"#FF6C00"}
            />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
