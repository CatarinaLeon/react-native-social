import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegistrationScreen from "../Screens/auht/RegistrationScreen";
import LoginScreen from "../Screens/auht/LoginScreen";
import HomeScreen from "../Screens/home/HomeScreen";
import CreateScreen from "../Screens/home/CreatePostsScreen";
import ProfileScreen from "../Screens/home/ProfileScreen";

import {SimpleLineIcons, Ionicons, Feather} from "@expo/vector-icons";

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
          headerShown: false,
          tabBarIcon: ({ focused}) => (
            <SimpleLineIcons
              name="grid"
              size={focused ? 25 : 20}
              color={focused ? '#FF6C00' : 'rgba(33, 33, 33, 0.8)'}
            />
          ),
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <MainTab.Screen
        options={{
          headerTitleAlign: 'center',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="add"
              size={focused ? 35 : 24}
              color={focused ? '#FF6C00': 'rgba(33, 33, 33, 0.8)'}
            />
          ),
        }}
        name="Создать публикацию"
        component={CreateScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarIcon: ({ focused }) => (
            <Feather
              name="user"
              size={focused ? 30 : 24}
              color={focused ? '#FF6C00': 'rgba(33, 33, 33, 0.8)'}
            />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
