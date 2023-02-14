import {AuthContextProvider} from "../context/auth";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {MainStack} from "./navigation/MainStack";
import {NavigationContainer} from "@react-navigation/native";
import {registerRootComponent} from "expo";
import {NotesProvider} from "../context/notes";

export default function Main() {
  return (
      // Set up the auth context and render our layout inside of it.
      <AuthContextProvider>
        <NotesProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <MainStack/>
            </NavigationContainer>
          </SafeAreaProvider>
        </NotesProvider>
      </AuthContextProvider>
  );
}

registerRootComponent(Main);