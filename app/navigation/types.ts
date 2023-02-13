import {NavigatorScreenParams} from "@react-navigation/native";

import {AuthStackParamList} from "./stacks/AuthStack";

// All stack and screens
export type StackScreensParamsList = {
  // Root stack
  ["AUTH_STACK"]: NavigatorScreenParams<AuthStackParamList>;
};
