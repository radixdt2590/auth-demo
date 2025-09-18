import React from "react";
import { Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function MessageItem({
  message,
  currentUser,
}: {
  message: any;
  currentUser: any;
}) {
  const isCurrentUser = currentUser?.id === message.userId;

  return (
    <View
      className={`${isCurrentUser ? "flex-row justify-end mr-3" : "ml-3"} mb-3 `}
    >
      <View
        className={` ${isCurrentUser ? "flex p-3 rounded-2xl border self-end bg-white border-neutral-300" : "flex p-3 rounded-2xl border self-start px-4 bg-indigo-100 border-indigo-200"}`}
        style={{ width: wp(40) }}
      >
        <Text style={{ fontSize: hp(1.9) }}>{message.text}</Text>
      </View>
    </View>
  );
}
