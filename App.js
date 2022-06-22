import { Provider } from "react-redux";
import {store} from './redux/store'
import { useFonts } from 'expo-font';

import Main from './components/Main'

export default function App() {

  const [loaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
  
  if (!loaded) {
    return null;
  }
  
  return (
    <>
      <Provider store={store}>
        <Main />
      </Provider>
    </>
  )
};