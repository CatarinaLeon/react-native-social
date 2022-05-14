import { useState,useEffect  } from "react";
import  {useRoute}  from './Routes/Routes.jsx';
import * as Font from 'expo-font';
// import { AppLoading } from "expo";
// import RegistrationScreen from './Screens/auht/RegistrationScreen.jsx';
// import LoginScreen from './Screens/auht/LoginScreen.jsx';
// import PostsScreen from "./Screens/home/PostsScreen.jsx";
// import CreateScreen from "./Screens/home/CreatePostsScreen.jsx";
// import ProfileScreen from "./Screens/home/ProfileScreen.jsx";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// const AuthStack = createNativeStackNavigator();
// const MainTab = createBottomTabNavigator();

const loadApplication = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
};

// const useRoute = (isAuth) => {
//   if (!isAuth) {
//     return (
//       <AuthStack.Navigator>
//         <AuthStack.Screen
//           options={{
//             headerShown: false,
//           }}
//           name="Login"
//           component={LoginScreen}
//         />
//         <AuthStack.Screen
//           options={{
//             headerShown: false,
//           }}
//           name="Register"
//           component={RegistrationScreen}
//         />
//       </AuthStack.Navigator>
//     );
//   }
//   return (
//     <MainTab.Navigator>
//       <MainTab.Screen name="Posts" component={PostsScreen} />
//       <MainTab.Screen name="Create" component={CreateScreen} />
//       <MainTab.Screen name="Profile" component={ProfileScreen} />
//     </MainTab.Navigator>
//   );
// };

export default function App() {
const [iasReady, setIasReady] = useState(false);
  const routing = useRoute(true);

  // if (!isReady) {
  //   return (
  //     <AppLoading
  //       startAsync={loadApplication}
  //       onFinish={() => setIsReady(true)}
  //       onError={console.warn}
  //     />
  //   )
  // }

  return (
    <>
      <NavigationContainer>
        {routing}
        {/* <MainTab.Navigator>
        <MainTab.Screen name="Posts" component={PostsScreen} />
        <MainTab.Screen name="Create" component={CreateScreen} />
        <MainTab.Screen name="Profile" component={ProfileScreen} />
      </MainTab.Navigator> */}
        {/* <AuthStack.Navigator>
        <AuthStack.Screen options={{headerShown:false}} name="Register" component={RegistrationScreen} />
        <AuthStack.Screen options={{headerShown:false}} name="Login" component={LoginScreen} />
      </AuthStack.Navigator> */}
    </NavigationContainer>
    </>
  );
}

