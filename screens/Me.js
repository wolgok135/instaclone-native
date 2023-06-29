import React, { useEffect } from "react";

import { Text, View } from "react-native";
import useMe from "../hooks/userMe";

export default function Me({ navigation }) {
  const { data } = useMe();

  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.userName,
    });
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
      <Text style={{ color: "white" }}>My Profile</Text>
    </View>
  );
}
