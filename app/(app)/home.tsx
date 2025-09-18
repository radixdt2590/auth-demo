import ChatList from "@/components/ChatList";
import { useAuth } from "@/context/authContext";
import { usersRef } from "@/firebaseConfig";
import { StatusBar } from "expo-status-bar";
import { getDocs, query, where } from "firebase/firestore";
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
    if (user?.id) {
      getUsers();
    } else {
      setLoading(false);
    }
  }, [user]);

  const getUsers = async () => {
    const q = query(usersRef, where("userId", "!=", user?.id));
    const querySnapshot = await getDocs(q);
    let data: User[] = [];

    querySnapshot.forEach((doc) => {
      data.push({ ...(doc.data() as User) });
    });

    setUsers(data);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      {loading ? (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : users.length > 0 ? (
        <ChatList users={users} currentUser={user as User} />
      ) : (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <Text className="text-gray-500">No users found</Text>
        </View>
      )}
    </View>
  );
}
