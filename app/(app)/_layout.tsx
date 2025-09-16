import HomeHeader from "@/components/HomeHeader";
import { Stack } from "expo-router";

const AppLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          header: () => <HomeHeader />,
        }}
      />
    </Stack>
  );
};

export default AppLayout;
