import React from "react";

import { Text, View } from "react-native";
import { MenuOption } from "react-native-popup-menu";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function MenuItem({
  text,
  action,
  value,
  icon,
}: {
  text: string;
  action: (v: any) => void;
  value: string | null;
  icon: React.ReactElement;
}) {
  return (
    <MenuOption onSelect={() => action(value)}>
      <View className="px-4 py-1 flex-row justify-between items-center">
        <Text
          style={{ fontSize: hp(1.7) }}
          className="font-semibold text-neutral-600"
        >
          {text}
        </Text>
        {icon}
      </View>
    </MenuOption>
  );
}
