import React, { useEffect, useState } from "react";

import * as MediaLibrary from "expo-media-library";

import styled from "styled-components/native";
import { Linking } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Top = styled.View`
  flex: 1;
  background-color: black;
`;

const Bottom = styled.View`
  flex: 1;
  background-color: black;
`;

export default function SelectPhoto() {
  const [ok, setOk] = useState(false);

  const getPermissions = async () => {
    //const permissions = await MediaLibrary.getPermissionsAsync();
    const { accessPrivileges, canAskAgain } =
      await MediaLibrary.getPermissionsAsync();

    // accessPrivileges가 none이라는 것은 유저가 권한을 거절했거나, 아직 요청하지 않았을 때임.
    if (accessPrivileges === "none" && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== "none") {
        console.log("1", accessPrivileges);
        setOk(true);
      }
    } else if (accessPrivileges !== "none") {
      console.log("2", accessPrivileges);
      setOk(true);
    }
  };
  const getPhotos = async () => {
    console.log("ok", ok);
    if (ok) {
      try {
        console.log("3");
        const albums = await MediaLibrary.getAlbumsAsync();
        console.log(albums);
      } catch (err) {
        console.log("error", err);
      }
    }
  };

  useEffect(() => {
    getPermissions();
    getPhotos();
  }, [ok]);

  return (
    <Container>
      <Top />
      <Bottom />
    </Container>
  );
}
