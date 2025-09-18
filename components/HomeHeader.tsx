import React from "react";

import { useAuth } from "@/context/authContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import { Platform, Pressable, Text, View } from "react-native";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MenuItem from "./CustomMenu";

const isIos = Platform.OS === "ios";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function HomeHeader() {
  const { top } = useSafeAreaInsets();
  console.log("🚀 ~ HomeHeader ~ top:", top);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  // Default profile image if user doesn't have one
  const defaultProfileUrl =
    "https://via.placeholder.com/150/6366f1/ffffff?text=U";
  console.log("🚀 ~ HomeHeader ~ user:", user);

  return (
    <View
      style={{ paddingTop: isIos ? top : top + 10 }}
      className="flex-row justify-between px-5 bg-indigo-600 pb-6 rounded-b-3xl shadow"
    >
      <View className="flex-1">
        <Text style={{ fontSize: hp(3) }} className="font-medium text-white">
          Chats
        </Text>
      </View>
      <View className="flex">
        <Menu>
          <MenuTrigger>
            <Pressable>
              <Image
                style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
                source={user?.profileUrl || defaultProfileUrl}
                placeholder={{ blurhash }}
                transition={1000}
              />
            </Pressable>
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                borderRadius: 10,
                borderCurve: "continuous",
                marginTop: 40,
                marginLeft: -30,
                backgroundColor: "white",
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 0 },
                width: 160,
                elevation: 10,
                zIndex: 1000,
              },
            }}
          >
            <MenuItem
              text="Profile"
              action={() => console.log("Profile clicked..")}
              value={null}
              icon={<Feather name="user" size={hp(2)} color={"#737373"} />}
            />
            <MenuItem
              text="Sign Out"
              action={handleLogout}
              value={null}
              icon={<AntDesign name="logout" size={hp(2)} color={"#737373"} />}
            />
          </MenuOptions>
        </Menu>
        {/* <Menu onSelect={(value) => alert(`Selected number: ${value}`)}>
          <MenuTrigger text="Select option" />
          <MenuOptions>
            <MenuOption value={1} text="One" />
            <MenuOption value={2}>
              <Text style={{ color: "red" }}>Two</Text>
            </MenuOption>
            <MenuOption value={3} disabled={true} text="Three" />
          </MenuOptions>
        </Menu> */}
      </View>
    </View>
  );
}
