import React, {useContext} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {AuthStack} from "./stacks/AuthStack";
import AuthContext from "../../context/auth";
import {AppStack} from "./stacks/AppStack";

const MainStackNav = createStackNavigator();

export const MainStack = (): JSX.Element => {

  const ctx = useContext(AuthContext);
  let isLoggedIn = ctx.isLoggedIn;
  console.log(isLoggedIn);

  return (
      <MainStackNav.Navigator
          screenOptions={() => ({
            headerShown: false,
          })}
      >
        {!isLoggedIn ? <MainStackNav.Screen
            name={"AUTH_STACK"}
            component={AuthStack}
        /> : <MainStackNav.Screen
            name={"APP_STACK"}
            component={AppStack}
        />}
      </MainStackNav.Navigator>
  );
};
