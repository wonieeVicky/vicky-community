﻿import { colors } from "@/constants";
import { Foundation } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.BLACK,
        contentStyle: {
          backgroundColor: colors.WHITE
        }
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "로그인",
          headerShown: true,
          headerTitleAlign: "center",
          headerLeft: () => (
            <Link href="/" replace>
              <Foundation name="home" size={28} color={"black"} />
            </Link>
          )
        }}
      />
    </Stack>
  );
}
