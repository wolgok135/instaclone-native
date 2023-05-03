import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Font from "expo-font";

import { Asset } from "expo-asset";

export default function App() {
  const [loading, setLoading] = useState(true);

  const preload = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));

    const imagesToLoad = [require("./assets/logo.png")];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));

    return Promise.all([...fontPromises, ...imagePromises]);
  };
  const onFinish = () => setLoading(false);

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        //startAsync는 promise를 리턴하는 함수를 받아야 함.
        //promise는 비동기함수를 동기화해서 처리 해주는 함수임. (async await처럼)
        //위의 Promise.all은 여러 promise를 하나씩 처리하면서 기다리면 시간이 오래 소요되니 병렬 처리하게 하는 함수?라고함.
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }
  return (
    <View style={styles.container}>
      <Text>initialization test3</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
