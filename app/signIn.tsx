import CustomKeyboardView from "@/components/CustomKeyboardView";
import Loading from "@/components/Loading";
import { useAuth } from "@/context/authContext";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function SignIn() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("SignIn", "Please fill all the fields!");
      return;
    }

    setLoading(true);

    const response = await login({ email, password });
    setLoading(false);
    
    if (!response.success) {
      Alert.alert("SignIn", response.message || "Login failed");
      return;
    }
    
    // Success - user will be automatically redirected by the auth context
  };

  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View style={{ paddingHorizontal: wp(5) }} className="flex-1 gap-12">
        <View className="items-center">
          <Image
            source={require("../assets/images/login.png")}
            style={{ height: hp(25) }}
            resizeMode="contain"
          />
        </View>
        <View className="gap-10">
          <Text
            className="font-bold tracking-wider text-center text-neutral-900"
            style={{ fontSize: hp(4) }}
          >
            Sign In
          </Text>
          <View className="gap-4">
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
            >
              <MaterialCommunityIcons
                name="email-outline"
                size={hp(2.7)}
                color="gray"
              />
              <TextInput
                onChangeText={(value) => setEmail(value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Email address"
                placeholderTextColor="gray"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            <View className="gap-3">
              <View
                style={{ height: hp(7) }}
                className="flex-row gap-4 px-4 bg-neutral-100 items-center justify-center rounded-xl"
              >
                <Feather name="lock" size={hp(2.7)} color="gray" />
                <TextInput
                  onChangeText={(value) => setPassword(value)}
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-neutral-700"
                  placeholder="Password"
                  placeholderTextColor="gray"
                  secureTextEntry
                />
              </View>
              <Text
                style={{ height: hp(2) }}
                className="font-semibold text-right text-neutral-500"
              >
                Forgot Password?
              </Text>
            </View>
            {loading ? (
              <View className="flex-row justify-center text-indigo-400">
                <Loading size={hp(9)} />
              </View>
            ) : (
              <TouchableOpacity
                style={{ height: hp(6.5) }}
                className="bg-indigo-500 rounded-xl justify-center items-center"
                onPress={handleLogin}
              >
                <Text
                  style={{ fontSize: hp(2.7) }}
                  className="text-white font-bold tracking-wider"
                >
                  SignIn
                </Text>
              </TouchableOpacity>
            )}

            <View className="flex-row justify-center">
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-neutral-500"
              >
                Don&apos;t have an account?{" "}
              </Text>
              <Pressable onPress={() => router.push("/signUp")}>
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-semibold text-indigo-500"
                >
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
