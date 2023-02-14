import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import App from "../../screens/App";
import Compose from "../../screens/Compose";
import {useAuth} from "../../../context/auth";
import {Platform, Pressable, Text} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {StatusBar} from "expo-status-bar";
import {useNavigation} from "@react-navigation/native";
import Note from "../../screens/Note";
import {useNotes} from "../../../context/notes";

const AppStackNav = createStackNavigator();

export function AppStack(): JSX.Element {

  const navigation = useNavigation();

  return (
      <>
        <StatusBar style="auto"/>
        <AppStackNav.Navigator
            initialRouteName={'App'}
        >
          <AppStackNav.Screen
              component={App}
              name={"index"}
              options={{
                title: "Notes",
                headerRight: SignOutButton,
                headerLargeTitle: true,
                // This does not work for some reason, it should render a search bar
                headerSearchBarOptions: {
                  onChangeText: (event) => {
                    // Update the query params to match the search query.
                    navigation.setParams({
                      q: event.nativeEvent.text,
                    });
                  },
                },
              }}/>
          <AppStackNav.Screen
              component={Compose}
              name={"Compose"}
              options={{
                title: "Create a new note",
                presentation: "modal",
                headerRight: Platform.select({
                  ios: DismissComposeButton.bind(navigation),
                }),
              }}/>
          <AppStackNav.Screen
              component={Note}
              name={"Note"}
              options={({route}) => ({
                title: determineTitle(route),
              })}
          />
        </AppStackNav.Navigator>
      </>
  );
}

function SignOutButton() {
  const {signOut} = useAuth();

  return (
      <Pressable
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            paddingRight: 8,
          }}
          onPress={() => {
            console.log("sign out pressed")
          signOut()}}
      >
        <Text
            style={{
              fontWeight: "normal",
              paddingHorizontal: 8,
              fontSize: 16,
            }}
        >
          Sign Out
        </Text>
        <FontAwesome name="sign-out" size={24} color="black"/>
      </Pressable>
  );
}

function DismissComposeButton(navigation) {
  return (
      <Pressable onPress={() => {
        navigation.goBack()
      }}>
        <Text
            style={{
              fontWeight: "normal",
              paddingHorizontal: 8,
              fontSize: 16,
            }}
        >
          Back
        </Text>
      </Pressable>
  );
}

function determineTitle(route) {
  const {note} = route.params;

  console.log("determineTitle", note);

  const data = useNotes();
  const selected = data.notes?.find((item) => item.id === note);
  return selected.id;
}
