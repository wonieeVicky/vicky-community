﻿import { colors } from "@/constants";
import { Feather } from "@expo/vector-icons";
import { Link, router, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function PostLayout() {
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
        name="write"
        options={{
          title: "글쓰기",
          headerShown: true,
          headerTitleAlign: "center",
          headerLeft: () => (
            <Link href="/" replace>
              <Feather name="arrow-left" size={28} color={"black"} />
            </Link>
          )
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: "",
          headerShown: true,
          headerLeft: () => (
            <Pressable
              onPress={() =>
                router.canGoBack() ? router.back() : router.replace("/")
              }
            >
              <Feather name="arrow-left" size={28} color={"black"} />
            </Pressable>
          )
        }}
      />
      <Stack.Screen
        name="update/[id]"
        options={{
          title: "수정",
          headerShown: true,
          headerLeft: () => (
            <Feather
              name="arrow-left"
              size={28}
              color={"black"}
              onPress={() => router.back()}
            />
          )
        }}
      />
    </Stack>
  );
}
