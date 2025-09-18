import React from "react";

import { blurhash } from "@/utills/common";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChatRoomHeader({
  user,
  router,
}: {
  user: any;
  router: any;
}) {
  const { top } = useSafeAreaInsets();

  return (
    <Stack.Screen
      options={{
        title: "",
        headerShadowVisible: false,
        headerLeft: () => (
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={hp(4)} color="#737373" />
            </TouchableOpacity>
            <View className="flex-row items-center gap-3">
              <Image
                source={{ uri: user.profileUrl }}
                style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
                placeholder={blurhash}
                transition={500}
                contentFit="cover"
              />
              <Text
                style={{ fontSize: hp(2.5) }}
                className="text-neutral-700 font-medium"
              >
                {user?.username}
              </Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <View className="flex-row items-center gap-8">
            <Ionicons name="call" size={hp(2.8)} color="#737373" />
            <Ionicons name="videocam" size={hp(2.8)} color="#737373" />
          </View>
        ),
      }}
    />
  );
}
