import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function StartPage() {
  return (
    <View className="flex-1 items-center justify-center bg-white p-20">
      <ActivityIndicator color={"gray"} size={"large"} />
    </View>
  );
}
