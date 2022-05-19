// import { useState  } from "react";
import { Provider } from "react-redux";
import {store} from './redux/store'
import Main from './components/Main'
import {LogBox} from "react-native"



// const loadApplication = async () => {
//   await Font.loadAsync({
//     "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
//     // "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
//     // "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
//   });
// };

export default function App() {
  // const [isReady, setIsReady] = useState(false);
  LogBox.ignoreLogs(['Setting a timer']);
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
        <Main />
      </Provider>
    </>
  )
}