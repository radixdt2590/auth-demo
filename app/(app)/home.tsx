import ChatList from "@/components/ChatList";
import { useAuth } from "@/context/authContext";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

interface User {
  id: string;
  email: string;
  username?: string;
  profileUrl?: string;
  role?: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    console.log("🚀 ~ Home ~ user:", user);
    if (user?.id) {
      // getUsers();
    } else {
      setLoading(false);
    }
  }, [user]);

  // const getUsers = async () => {
  //   console.log("inside getUsers==============");
  //   const q = query(usersRef, where("userId", "!=", user?.id));
  //   const querySnapshot = await getDocs(q);
  //   let data: { [x: string]: any; }[] = [];

  //   querySnapshot.forEach((doc) => {
  //     data.push({ ...doc.data() });
  //   });
  //   console.log("users------", data);
  // };

  return (
    <View className="flex-1 bg-white">
      <Text className="text-xl font-bold text-blue-500">Home</Text>
      <StatusBar style="light" />
      {loading ? (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : users.length > 0 ? (
        <ChatList users={users} />
      ) : (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <Text className="text-gray-500">No users found</Text>
        </View>
      )}
    </View>
  );
}
