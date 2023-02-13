import React from "react";
import {createStackNavigator, StackScreenProps} from "@react-navigation/stack";
import {CompositeScreenProps} from "@react-navigation/native";

import {StackScreensParamsList} from "../types";
import {MainStackParamListKeys, MainStackScreenProps} from "../MainStack";
import SignIn from "../../screens/SignIn";

export type AuthStackParamListKeys = "SIGN_IN";
export type AuthStackParamList = Pick<StackScreensParamsList, AuthStackParamListKeys>;
// Auth stack navigation props
export type AuthStackScreenProps<T extends AuthStackParamListKeys> = CompositeScreenProps<
    StackScreenProps<AuthStackParamList, T>,
    MainStackScreenProps<MainStackParamListKeys>
>;

const AuthStackNav = createStackNavigator<AuthStackParamList>();
const ROUTES = {
  AUTH_STACK: "AUTH_STACK",
  SIGN_IN: "SIGN_IN"
}

export function AuthStack({navigation}: MainStackScreenProps<typeof ROUTES.AUTH_STACK>): JSX.Element {
  return (
      <AuthStackNav.Navigator initialRouteName={ROUTES.SIGN_IN}>
        <AuthStackNav.Screen component={SignIn} options={{headerShown: false}} name={ROUTES.SIGN_IN}/>
      </AuthStackNav.Navigator>
  );
}

