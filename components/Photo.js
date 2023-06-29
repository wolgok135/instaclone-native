import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import styled from "styled-components/native";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import { gql, useMutation } from "@apollo/client";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Container = styled.View``;

const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;

const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;

const UserName = styled.Text`
  color: white;
  font-weight: 600;
`;

const File = styled.Image``;
const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;
const Caption = styled.View`
  flex-direction: row;
`;
const CaptionText = styled.Text`
  color: white;
  margin-left: 10px;
`;
const Likes = styled.Text`
  color: white;
  margin: 7px 0px;
  font-weight: 600;
`;
const ExtraContainer = styled.View`
  padding: 10px;
`;

export default function Photo({ id, user, caption, file, isLiked, likes }) {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(height - 450);

  const updateToggleLike = (cache, result) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;

    //isLiked와 likes를 props에서 가져 왔기 때문에 사실 아래 기능 구현 시 readFragment를 쓸 필요는 없지만...
    //그냥 cache에서 데이터를 가져 올수도 있다는 걸 확인하기 위해 아래와 같이 구현함. 강의 12.10 참고...

    if (ok) {
      const photoId = `Photo:${id}`;
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          likes(prev) {
            if (isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };

  useEffect(() => {
    Image.getSize(file, (width, height) => {
      if (height < 200) {
        setImageHeight(height);
      } else if (height < 500) {
        setImageHeight(height / 2);
      } else if (height < 1000) {
        setImageHeight(height / 3);
      } else if (height <= 2000) {
        setImageHeight(height / 6);
      } else if (height <= 3000) {
        setImageHeight(height / 9);
      } else if (height <= 4000) {
        setImageHeight(height / 11);
      } else {
        setImageHeight(height / 13);
      }
    });
  }, [file]);

  //이미지 처리에 대해서 #16.6부터 강의를 다시 확인해볼 것... getSize()

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id: id,
    },
    update: updateToggleLike,
  });

  const goToProfile = () => {
    navigation.navigate("Profile", {
      userName: user.userName,
      id: user.id,
    });
  };

  return (
    <Container>
      <Header onPress={goToProfile}>
        <UserAvatar resizeMode="cover" source={{ uri: user.avatar }} />
        <UserName>{user.userName}</UserName>
      </Header>
      <File
        resizeMode="cover"
        style={{ width: width, height: imageHeight }}
        source={{ uri: file }}
      />
      {
        //웹에서 이미지를 불러 올 때는 width와 height를 명시적으로 반드시 정의해야 함 그러지 않으면 이미지가 나타나지 않음
      }
      <ExtraContainer>
        <Actions>
          <Action onPress={toggleLikeMutation}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              color={isLiked ? "tomato" : "white"}
              size={22}
            />
          </Action>
          <Action onPress={() => navigation.navigate("Comments")}>
            <Ionicons name="chatbubble-outline" color="white" size={22} />
          </Action>
        </Actions>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Likes", {
              photoId: id,
            })
          }
        >
          <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
        </TouchableOpacity>
        <Caption>
          <TouchableOpacity onPress={goToProfile}>
            <UserName>{user.userName}</UserName>
          </TouchableOpacity>
          <CaptionText>{caption}</CaptionText>
        </Caption>
      </ExtraContainer>
    </Container>
  );
}

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    userName: PropTypes.string.isRequired,
  }),
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  caption: PropTypes.string,
  commentNumber: PropTypes.number.isRequired,
};
