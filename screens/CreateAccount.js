import React, { useEffect, useRef } from "react";

import styled from "styled-components/native";
import AuthLayout from "../auth/AuthLayout";
import AuthButton from "../auth/AuthButton";
import { KeyboardAvoidingView, Text, TextInput } from "react-native";
import { MyTextInput } from "../auth/AuthShared";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String!
    $userName: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      userName: $userName
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

export default function CreateAccount({ navigation }) {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const onCompleted = (data) => {
    console.log(data);
    const {
      createAccount: { ok },
    } = data;

    const { userName, password } = getValues();

    if (ok) {
      navigation.navigate("Login", {
        userName: userName,
        password: password,
      });
    }
  };
  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  /*
  const onFirstNameNext = () => {
    lastNameRef.current?.focus();
  };
*/ // 각각의 컴포넌트별로 next를 눌렀을 때, 위와 같이 함수를 작성해도 되는데.. 아래 처럼 하나로 써도 됨.

  const onNext = (nextRef) => {
    nextRef.current?.focus();
  };

  const onValid = (data) => {
    console.log("onvalid");
    if (!loading) {
      console.log(data);
      createAccountMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    register("firstName", { required: true });
    register("lastName", { required: true });
    register("userName", { required: true });
    register("email", { required: true });
    register("password", { required: true });
  }, [register]);

  return (
    <AuthLayout>
      <MyTextInput
        autoFocus={true}
        placeholder="   First Name"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(lastNameRef)}
        onChangeText={(text) => {
          setValue("firstName", text);
        }}
      />

      <MyTextInput
        ref={lastNameRef}
        placeholder="   Last Name"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(usernameRef)}
        onChangeText={(text) => {
          setValue("lastName", text);
        }}
      />
      <MyTextInput
        ref={usernameRef}
        placeholder="   UserName"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(emailRef)}
        onChangeText={(text) => {
          setValue("userName", text);
        }}
      />
      <MyTextInput
        ref={emailRef}
        placeholder="   Email"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        returnKeyType="next"
        autoCapitalize="none"
        keyboardType="email-address" //이렇게 넣으면 keyboard에 @가 생김
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => {
          setValue("email", text);
        }}
      />
      <MyTextInput
        ref={passwordRef}
        placeholder="   Password"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        returnKeyType="done"
        secureTextEntry={true} //이렇게 넣으면 입력값이 가려지고, 첫글자가 대문자로 써지지 않음.
        onSubmitEditing={handleSubmit(onValid)}
        lastOne={true}
        onChangeText={(text) => {
          setValue("password", text);
        }}
      />
      <AuthButton
        text="Create Account"
        loading
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
