import { useSearchParams } from "expo-router/build/hooks";
import React from "react";

export default function ChatRoom() {
  const item = useSearchParams();
  console.log("got item data------", item);
  return <view>ChatRoom</view>;
}
