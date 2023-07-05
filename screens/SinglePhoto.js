import React, { useEffect, useState } from "react";

import { RefreshControl, ScrollView, Text, View } from "react-native";
import useMe from "../hooks/userMe";

import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { gql, useQuery } from "@apollo/client";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";

const SEE_PHOTO = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      ...PhotoFragment
      user {
        id
        userName
        avatar
      }
      caption
    }
  }
  ${PHOTO_FRAGMENT}
`;

export default function SinglePhoto({ route }) {
  console.log("homephoto", route.params.photoId);
  const { data, loading, refetch } = useQuery(SEE_PHOTO, {
    variables: {
      id: route?.params?.photoId,
    },
  });

  const [refreshing, setRefreshing] = useState();
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={{ backgroundColor: "black" }}
        contentContainerStyle={{
          backgroundColor: "black",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Photo {...data?.seePhoto} />
      </ScrollView>
    </ScreenLayout>
  );
}
