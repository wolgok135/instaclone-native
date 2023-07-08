import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, Image, Text, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Slider from "@react-native-community/slider";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";

import { useIsFocused } from "@react-navigation/native";

import * as MediaLibrary from "expo-media-library";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Actions = styled.View`
  flex: 0.3;
  align-items: center;
  justify-content: space-around;
  padding: 0px 50px;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
`;

const SliderContainer = styled.View``;

const ActionsContainer = styled.View`
  flex-direction: row;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const PhotoActions = styled.View`
  flex-direction: row;
`;

const PhotoAction = styled.TouchableOpacity`
  background-color: white;
  padding: 5px 10px;
  border-radius: 4px;
`;
const PhotoActionText = styled.Text`
  font-weight: 600;
`;

export default function TakePhoto({ navigation }) {
  const camera = useRef();
  const [takenPhoto, setTakenPhoto] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [ok, setOk] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const getPermissions = async () => {
    //const permissions = await Camera.requestCameraPermissionsAsync();
    const { granted } = await Camera.requestCameraPermissionsAsync();
    setOk(granted === true);
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    getPermissions();
  }, []);

  useEffect(() => {
    if (isFocused) {
      console.log("focused!");
    }
  }, [isFocused]);

  const onCameraSwitch = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };

  const onZoomValueChange = (e) => {
    //console.log(e); e는 받은 이벤트인데, slider의 값이 들어옴.
    setZoom(e);
  };

  const onFlashModeChange = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.auto);
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };

  const onCameraReady = () => setCameraReady(true);
  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const { uri } = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      setTakenPhoto(uri);
    }
  };

  const onDismiss = () => {
    setTakenPhoto("");
  };

  const goToUpload = async (save) => {
    if (save) {
      //save
      //const asset = await MediaLibrary.createAssetAsync(takenPhoto);
      //createAssetAsync함수는 객체를 리턴하지만, saveToLibraryAsync는 객체를 리턴하지 않음. 후처리가 필요 없을때는 후자를 쓰면 됨.
      await MediaLibrary.saveToLibraryAsync(takenPhoto);
    }
    //go to upload
    console.log("will Upload", takenPhoto);
  };

  const onUpload = () => {
    Alert.alert(
      "사진을 업로드할까요?",
      "디바이스에 저장 후 업로드할까요? 업로드만 할까요?",
      [
        {
          text: "저장 후 업로드",
          onPress: () => goToUpload(true),
        },
        {
          text: "저장하지 않고 업로드",
          onPress: () => goToUpload(false),
        },
      ]
    );
  };

  return (
    <Container>
      <StatusBar hidden={true} />
      {isFocused ? (
        takenPhoto === "" ? (
          <Camera
            type={cameraType}
            style={{ flex: 1 }}
            zoom={zoom}
            flashMode={flashMode}
            ref={camera}
            onCameraReady={onCameraReady}
          >
            <CloseButton onPress={() => navigation.navigate("Tabs")}>
              <Ionicons name="close" color="white" size={30} />
            </CloseButton>
          </Camera>
        ) : (
          <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
        )
      ) : null}
      {takenPhoto === "" ? (
        <Actions>
          <SliderContainer>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="rgba(255,255,255,0.8)"
              onValueChange={onZoomValueChange}
            />
          </SliderContainer>
          <ButtonsContainer>
            <TakePhotoBtn onPress={takePhoto} />
            <ActionsContainer>
              <TouchableOpacity
                onPress={onFlashModeChange}
                style={{ marginRight: 30 }}
              >
                <Ionicons
                  size={30}
                  color="white"
                  name={
                    flashMode === Camera.Constants.FlashMode.off
                      ? "flash-off"
                      : flashMode === Camera.Constants.FlashMode.on
                      ? "flash"
                      : flashMode === Camera.Constants.FlashMode.auto
                      ? "eye"
                      : ""
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={onCameraSwitch}>
                <Ionicons
                  name={
                    cameraType === Camera.Constants.Type.front
                      ? "camera-reverse"
                      : "camera"
                  }
                  size={30}
                  color="white"
                ></Ionicons>
              </TouchableOpacity>
            </ActionsContainer>
          </ButtonsContainer>
        </Actions>
      ) : (
        <Actions>
          <PhotoActions>
            <PhotoAction onPress={onDismiss}>
              <PhotoActionText>Dismiss</PhotoActionText>
            </PhotoAction>
            <PhotoAction onPress={onUpload}>
              <PhotoActionText>Upload</PhotoActionText>
            </PhotoAction>
          </PhotoActions>
        </Actions>
      )}
    </Container>
  );
}
