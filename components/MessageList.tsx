import React from "react";

import { ScrollView, View } from "react-native";
import MessageItem from "./MessageItem";

export default function MessageList({
  messages,
  currentUser,
  scrollViewRef,
}: {
  messages: any;
  currentUser: any;
  scrollViewRef: any;
}) {
  return (
    <ScrollView
      ref={scrollViewRef}
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
