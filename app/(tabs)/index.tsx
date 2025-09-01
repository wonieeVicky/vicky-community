import CustomButtons from "@/components/CustomButtons";
import { router } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
      <CustomButtons label="버튼" onPress={() => router.push("/auth")} />
    </SafeAreaView>
  );
}
