import React, { useEffect } from "react";

import { Text, View } from "react-native";
import useMe from "../hooks/userMe";

import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { gql, useQuery } from "@apollo/client";

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

export default function Me({ navigation }) {
  const { data } = useQuery(SEE_PHOTO_RE, {
    variables: {
      id: 23,
    },
  });

  console.log(data);

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
