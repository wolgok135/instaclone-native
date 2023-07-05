import React, { useEffect } from "react";

import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import styled from "styled-components/native";
import DissmissKeyboard from "../components/DismissKeyboard";
import { useForm } from "react-hook-form";
import { gql, useLazyQuery } from "@apollo/client";
import { FlatList } from "react-native-gesture-handler";

const SEARCH_PHOTOS = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;

const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 1);
  width: ${(props) => props.width / 1.5}px;
  color: black;
  padding: 5px 10px;
  border-radius: 10px;
`;

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 15px;
`;

export default function Search({ navigation }) {
  const numColumns = 3;
  const { width } = useWindowDimensions();
  const { register, setValue, watch, handleSubmit } = useForm();

  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_PHOTOS);
  //useQuery가 아니라 useLazyQuery를 쓰는 이유...
  //useQuery는 Component가 mount될 때 바로 Query를 실행함.
  //사용자가 search버튼을 눌렀을 때 Query를 실행하기를 원하기 때문에, 게으른 Query를 쓰는 것임.

  const onValid = ({ keyword }) => {
    startQueryFn({
      variables: {
        keyword: keyword,
      },
    });
  };

  const searchBox = () => (
    <Input
      width={width}
      placeholderTextColor="rgba(0,0,0,0.8)"
      placeholder="Search Photo"
      autoCapitalize="none"
      returnKeyType="search"
      returnKeyLabel="Search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: searchBox,
    });
    register("keyword", {
      required: true,
      minLength: 3,
    });
  }, []);

  const renderItem = ({ item: photo }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("SinglePhoto", {
          photoId: photo.id,
        });
      }}
    >
      <Image
        source={{ uri: photo.file }}
        style={{ width: width / numColumns, height: 100 }}
      />
    </TouchableOpacity>
  );

  return (
    <DissmissKeyboard>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>검색어를 입력해주세요</MessageText>
          </MessageContainer>
        ) : null}
        {!data?.searchPhotos !== undefined ? (
          data?.searchPhotos.length === 0 ? (
            <MessageContainer>
              <MessageText>아무것도 찾지 못했습니다.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              numColumns={numColumns}
              data={data?.searchPhotos}
              keyExtractor={(photo) => "" + photo.id}
              renderItem={renderItem}
            />
          )
        ) : null}
      </View>
    </DissmissKeyboard>
  );
}
