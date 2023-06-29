import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native";

import React from "react";

export default function DissmissKeyboard({ children }) {
  const dissmissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={dissmissKeyboard}
      disabled={Platform.OS === "web"}
    >
      {children}
    </TouchableWithoutFeedback>
  );
}
