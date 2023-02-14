import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import SignIn from "../../screens/SignIn";


const AuthStackNav = createStackNavigator();
const ROUTES = {
  AUTH_STACK: "AUTH_STACK",
  SIGN_IN: "SIGN_IN"
}

export function AuthStack(): JSX.Element {
  return (
      <AuthStackNav.Navigator initialRouteName={ROUTES.SIGN_IN}>
        <AuthStackNav.Screen
            component={SignIn}
            options={{headerShown: false}}
            name={ROUTES.SIGN_IN}
        />
      </AuthStackNav.Navigator>
  );
}

