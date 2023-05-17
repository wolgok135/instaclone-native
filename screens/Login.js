import React, { useEffect, useRef } from "react";

import AuthLayout from "../auth/AuthLayout";
import { MyTextInput } from "../auth/AuthShared";
import { useForm } from "react-hook-form";
import AuthButton from "../auth/AuthButton";
import { gql, useMutation } from "@apollo/client";
import { isLoggedInVar, logUserIn } from "../apollo";

const LOGIN_MUTATION = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      ok
      error
      token
    }
  }
`;

export default function Login({ route: { params } }) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      password: params?.password,
      userName: params?.userName,
    },
  });
  //react native에서는 useForm에서 formState를 사용할 수 없음. 그래서 watch를 사용함. watch는 form의 값을 실시간으로 지켜봄
  const passwordRef = useRef();

  const onCompleted = async (data) => {
    //mutation이 끝났을 때
    const {
      login: { ok, error, token },
    } = data;

    if (ok) {
      await logUserIn(token);
    } else {
      console.log(error);
    }
  };

  //onCompleted함수는 아래의 useMutation에서 onCompleted선언을 할 때보다 항상 위에 위치해야 함.
  //이걸 useMutation보다 아래에 선언하면 결과를 못 받아옴.
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const onValid = (data) => {
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    register("userName", { required: true });
    register("password", { required: true });
  }, [register]);

  return (
    <AuthLayout>
      <MyTextInput
        value={watch("userName")}
        placeholder="   UserName"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        returnKeyType="next"
        autoCapitalize="none"
        onChangeText={(text) => setValue("userName", text)}
        onSubmitEditing={() => onNext(passwordRef)}
      />
      <MyTextInput
        value={watch("password")}
        ref={passwordRef}
        placeholder="   Password"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        returnKeyType="done"
        secureTextEntry={true} //이렇게 넣으면 입력값이 가려지고, 첫글자가 대문자로 써지지 않음.
        lastOne={true}
        onChangeText={(text) => setValue("password", text)}
        onSubmitEditing={handleSubmit(onValid)}
      />
      <AuthButton
        text="Log in"
        disabled={!watch("userName") || !watch("password")}
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
