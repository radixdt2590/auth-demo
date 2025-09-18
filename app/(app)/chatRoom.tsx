import ChatRoomHeader from "@/components/ChatRoomHeader";
import CustomKeyboardView from "@/components/CustomKeyboardView";
import MessageList from "@/components/MessageList";
import { useAuth } from "@/context/authContext";
import { db } from "@/firebaseConfig";
import { getRoomId } from "@/utills/common";
import Feather from "@expo/vector-icons/Feather";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function ChatRoom() {
  const item = useLocalSearchParams();
  console.log("🚀 ~ ChatRoom ~ item:=============", item);
  const router = useRouter();
  const { user } = useAuth();
  const [messages, setMessages] = useState<any>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    createRoomIfNotExist();
    let roomId = getRoomId(user?.id, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setMessages([...allMessages]);
    });

    return unsub;
  }, []);

  const createRoomIfNotExist = async () => {
    let roomId = getRoomId(user?.id, item?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const handleSendMessage = async () => {
    let message = text.trim();
    console.log("🚀 ~ handleSendMessage ~ message:", message);
    if (!message) return;
    try {
      let roomId = getRoomId(user?.id, item?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messageRef = collection(docRef, "messages");
      setText("");
      const newDoc = await addDoc(messageRef, {
        userId: user?.id,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });
      console.log("new message Id---------", newDoc.id);
    } catch (err: any) {
      Alert.alert("Message", err.message);
    }
  };

  return (
    <CustomKeyboardView inChat={true}>
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />
        <ChatRoomHeader user={item} router={router} />
        <View className="h-3 border-b border-neutral-300" />
        <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
          <View className="flex-1">
            <MessageList messages={messages} currentUser={user} />
          </View>
          <View className="pt-2" style={{ marginBottom: hp(2.7) }}>
            <View className="flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5">
              <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Type message..."
                style={{ fontSize: hp(2) }}
                className="flex-1 mr-2"
              />
              <TouchableOpacity
                onPress={handleSendMessage}
                className="bg-neutral-200 p-2 mr-[1px] rounded-full justify-center"
              >
                <Feather name="send" size={hp(2.7)} color="#737373" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
