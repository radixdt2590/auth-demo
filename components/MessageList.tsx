import React from "react";

import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MessageItem from "./MessageItem";

export default function MessageList({
  messages,
  currentUser,
}: {
  messages: any;
  currentUser: any;
}) {
  const { top } = useSafeAreaInsets();

  console.log("🚀 ~ room header ~ user:", currentUser);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
    >
      {messages.map((message: any, index: number) => {
        return (
          <View key={index} className="flex-1">
            <MessageItem message={message} currentUser={currentUser} />
          </View>
        );
      })}
    </ScrollView>
  );
}
