import React, { useEffect } from "react";

import { Text, View } from "react-native";

export default function Profile({ navigation, route }) {
  //console.log(navigation, route);
  useEffect(() => {
    if (route?.params?.username) {
      navigation.setOptions({
        title: route.params.userName,
        //headerTintColor: blue,
      });
    }
  });

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Someone else's Profile</Text>
    </View>
  );
}
