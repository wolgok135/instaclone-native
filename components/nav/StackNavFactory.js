import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SinglePhoto from "../../screens/SinglePhoto";
import Profile from "../../screens/Profile";
import Feed from "../../screens/Feed";
import Search from "../../screens/Search";
import Notifications from "../../screens/Notifications";
import Me from "../../screens/Me";
import Likes from "../../screens/Likes";
import { Image } from "react-native";
import Comments from "../../screens/Comments";

const Stack = createStackNavigator();

export default function StackNavFactory({ screenName }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "black",
          shadowColor: "rgba(255,255,255,0.3)",
        },
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{
            headerTitle: () => (
              <Image
                style={{ maxWidth: "100%", maxHeight: 40 }}
                resizeMode="contain"
                source={require("../../assets/whiteLogo.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name="Search" component={Search} />
      ) : null}
      {screenName === "Notifications" ? (
        <Stack.Screen name="Notifications" component={Notifications} />
      ) : null}
      {screenName === "Me" ? <Stack.Screen name="Me" component={Me} /> : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="SinglePhoto" component={SinglePhoto} />
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
}
