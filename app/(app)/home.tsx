import { useAuth } from "@/context/authContext";
import React from "react";
import { Button, Text, View } from "react-native";

export default function Home() {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">Home</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
