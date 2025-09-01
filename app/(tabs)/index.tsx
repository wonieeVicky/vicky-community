import CustomButtons from "@/components/CustomButtons";
import { SafeAreaView, Text } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
      <CustomButtons label="버튼" onPress={() => console.log("버튼 클릭")} />
    </SafeAreaView>
  );
}
