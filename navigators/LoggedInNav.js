import React from "react";
import TabsNav from "./TabsNav";
import { createStackNavigator } from "@react-navigation/stack";
import SelectPhoto from "../screens/SelectPhoto";
import UploadNav from "./UploadNav";

const Stack = createStackNavigator();

export default function LoggedInNav() {
  return (
    //<Stack.Navigator headerMode="none" mode="modal">
    //<Stack.Navigator screenOptions={{ headerShown: false }} mode="modal">
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: "modal" }}
    >
      <Stack.Screen name="Tabs" component={TabsNav} />
      <Stack.Screen name="Upload" component={UploadNav} />
    </Stack.Navigator>
  );
}
