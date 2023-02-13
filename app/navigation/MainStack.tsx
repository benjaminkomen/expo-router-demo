import React from "react";
import {createStackNavigator, StackScreenProps} from "@react-navigation/stack";
import {AuthStack} from "./stacks/AuthStack";
import {StackScreensParamsList} from "./types";

// --- Main stack screens --- //
export type MainStackParamListKeys = "AUTH_STACK" | "APP";
export type MainStackParamList = Pick<StackScreensParamsList, MainStackParamListKeys>;
// Main stack navigation props
export type MainStackScreenProps<T extends MainStackParamListKeys> = StackScreenProps<MainStackParamList, T>;

const MainStackNav = createStackNavigator<MainStackParamList>();

export const MainStack = (): JSX.Element => {

  return (
      <>
        <MainStackNav.Navigator
            screenOptions={() => ({
              headerShown: false,
            })}
        >
          <MainStackNav.Screen
              name={"AUTH_STACK"}
              component={AuthStack}
          />
        </MainStackNav.Navigator>
      </>
  );
};
