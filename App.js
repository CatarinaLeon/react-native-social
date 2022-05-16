import { useState,useEffect  } from "react";
import  {useRoute}  from './Routes/Routes.jsx';
import * as Font from 'expo-font';
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import{store} from './redux/store'
import { AppLoading } from "expo";
import { LogBox } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from './firebase/config'

const auth = getAuth(app)
LogBox.ignoreLogs([
// "exported from 'deprecated-react-native-prop-types'.",
  "ViewPropTypes will be removed",
"ColorPropType will be removed",
])

// const loadApplication = async () => {
//   await Font.loadAsync({
//     "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
//     // "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
//     // "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
//   });
// };

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null)

  const auth = getAuth(app)
  onAuthStateChanged(auth,(user)=>setUser(user))

  const routing = useRoute(user);

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
      <Provider store={store}>
        <NavigationContainer>{routing}</NavigationContainer>
      </Provider>
      
    </>
  );
}

