import React from "react";

import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

const isIos = Platform.OS === "ios";
export default function CustomKeyboardView({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <KeyboardAvoidingView
      behavior={isIos ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
