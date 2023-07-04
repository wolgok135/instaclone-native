import React from "react";
import { Image, ScrollView } from "react-native";

import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { gql, useQuery } from "@apollo/client";
import Photo from "../components/Photo";

const SEE_PHOTO_RE = gql`
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

/*
const SEE_PHOTO = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      id
      file
      likes
      commentNumber
      isLiked
      user {
        id
        userName
        avatar
      }
      caption
      comments {
        id
        user {
          userName
          avatar
        }
        payload
        isMine
        createdAt
      }
      createdAt
      isMine
    }
  }
`;
*/

//export default function Photo({ id, user, caption, file, isLiked, likes }) {

export default function HomePhoto({ route }) {
  console.log("homephoto", route.params.photoId);
  /*
  const { data, loading } = useQuery(SEE_PHOTO, {
    variables: {
      id: route?.params?.photoId,
    },
    fetchPolicy: "no-cache",
  });
  */

  const { data, loading, refetch } = useQuery(SEE_PHOTO_RE, {
    variables: {
      id: 22,
    },
  });

  console.log(data);

  //ScrollView 내부 컨텐트에는 style prop이 없음. 대신 이 역할을 하는게 contentContainerStyle prop임.
  return (
    <ScrollView
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
  );
}
