import { Provider } from "../context/auth";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {MainStack} from "./navigation/MainStack";
import {NavigationContainer} from "@react-navigation/native";
import {registerRootComponent} from "expo";

export default function App() {
  return (
      // Setup the auth context and render our layout inside of it.
      <Provider>
        <SafeAreaProvider>
          <NavigationContainer>
            <MainStack/>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
  );
}

registerRootComponent(App);