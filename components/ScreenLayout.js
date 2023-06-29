import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { logUserOut } from "../apollo";

export default function ScreenLayout({ loading, children }) {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={() => logUserOut()}>
        <Text style={{ color: "white" }}>log out</Text>
      </TouchableOpacity>
      {loading ? <ActivityIndicator color="white" /> : children}
    </View>
  );
}
