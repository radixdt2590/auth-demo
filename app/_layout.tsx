import { AuthProvider, useAuth } from "@/context/authContext";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { MenuProvider } from "react-native-popup-menu";
import { SafeAreaView } from "react-native-safe-area-context";
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
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
      <Slot />
    </SafeAreaView>
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
