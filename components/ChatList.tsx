import { useRouter } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";
import ChatItem from "./ChatItem";

interface User {
  id: string;
  email: string;
  username?: string;
  profileUrl?: string;
  role?: string;
}

export default function ChatList({ users }: { users: User[] }) {
  console.log("🚀 ~ ChatList ~ users:", users.length);
  const router = useRouter();
  return (
    <View className="flex-1">
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item, index) => item.id || index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <>
            {console.log("index---", index)}
            <ChatItem
              noBorder={index + 1 === users.length}
              item={item}
              index={index}
              router={router}
            />
          </>
        )}
      />
    </View>
  );
}
