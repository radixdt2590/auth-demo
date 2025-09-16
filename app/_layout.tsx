import { AuthProvider, useAuth } from "@/context/authContext";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import "../global.css";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inApp = segments[0] === "(app)";
    if (typeof isAuthenticated === undefined) return;
    else if (isAuthenticated && !inApp) router.replace("/home");
    else if (isAuthenticated === false) router.replace("/signIn");
  }, [isAuthenticated]);

  return (
    <View className="flex-1 pt-20">
      <Slot />
    </View>
  );
};

const RootLayout = () => {
  return (
    <MenuProvider>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </MenuProvider>
  );
};

export default RootLayout;
