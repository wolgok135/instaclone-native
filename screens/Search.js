import React, { useEffect } from "react";

import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import DissmissKeyboard from "../components/DismissKeyboard";
import { useForm } from "react-hook-form";
import { gql, useLazyQuery } from "@apollo/client";

const SEARCH_PHOTOS = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;

const Input = styled.TextInput``;

export default function Search({ navigation }) {
  const { register, setValue, watch } = useForm();

  const [startQueryFn, { loading, data }] = useLazyQuery(SEARCH_PHOTOS);
  //useQuery가 아니라 useLazyQuery를 쓰는 이유...
  //useQuery는 Component가 mount될 때 바로 Query를 실행함.
  //사용자가 search버튼을 눌렀을 때 Query를 실행하기를 원하기 때문에, 게으른 Query를 쓰는 것임.

  const searchBox = () => (
    <TextInput
      style={{ backgroundColor: "white" }}
      placeholderTextColor="black"
      placeholder="Search Photo"
      autoCapitalize="none"
      returnKeyType="search"
      returnKeyLabel="Search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: searchBox,
    });
    register("keyword");
  }, []);
  console.log(watch());

  return (
    <DissmissKeyboard>
      <View
        style={{
          backgroundColor: "black",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
          <Text style={{ color: "white" }}>Go to Photo </Text>
        </TouchableOpacity>
      </View>
    </DissmissKeyboard>
  );
}
