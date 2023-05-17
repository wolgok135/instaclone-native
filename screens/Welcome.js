import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { colors } from "../color";
import { TouchableOpacity } from "react-native-gesture-handler";
import AuthLayout from "../auth/AuthLayout";
import AuthButton from "../auth/AuthButton";

const LoginLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
`;

export default function Welcome({ navigation }) {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogIn = () => navigation.navigate("Login");

  return (
    <AuthLayout>
      <AuthButton
        disabled={false}
        onPress={goToCreateAccount}
        text="Create New Account"
      />

      <TouchableOpacity onPress={goToLogIn}>
        <LoginLink>Log in</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
}
