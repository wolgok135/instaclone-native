import AppLoading from "expo-app-loading";

import { useState } from "react";
import { useColorScheme } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import * as Font from "expo-font";

import { Asset } from "expo-asset";

import LoggedOutNav from "./navigators/LoggedOutNav";
import { NavigationContainer } from "@react-navigation/native";

import { ApolloProvider, useReactiveVar } from "@apollo/client";

import client, { isLoggedInVar, tokenVar, cache } from "./apollo";
import LoggedInNav from "./navigators/LoggedInNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageWrapper, persistCache } from "apollo3-cache-persist";

export default function App() {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));

    const imagesToLoad = [require("./assets/logo.png")];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));

    return Promise.all([...fontPromises, ...imagePromises]);
  };

  const preload = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    /*
    await persistCache({
      cache,
      storage: new AsyncStorageWrapper(AsyncStorage),
    });
*/
    return preloadAssets();
  };
  const onFinish = () => setLoading(false);
  const light = useColorScheme() === "light";

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
    <ApolloProvider client={client}>
      <NavigationContainer>
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
      </NavigationContainer>
    </ApolloProvider>
  );
}
