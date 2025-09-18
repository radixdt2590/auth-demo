import React from "react";

import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

const isIos = Platform.OS === "ios";
export default function CustomKeyboardView({
  children,
  inChat,
}: {
  children: React.ReactNode;
  inChat?: boolean;
}) {
  let kavConfig = {};
  let scrollViewConfig = {};
  if (inChat) {
    kavConfig = {
      keyboardVerticalOffset: 90,
    };
    scrollViewConfig = {
      contentContainerStyle: { flex: 1 },
    };
  }
  return (
    <KeyboardAvoidingView
      behavior={isIos ? "padding" : "height"}
      style={{ flex: 1 }}
      {...kavConfig}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled" 
        {...scrollViewConfig}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
