import CustomButtons from "@/components/CustomButtons";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
      <CustomButtons
        label="버튼"
        onPress={() => <CustomButtons label="버튼" onPress={() => console.log("버튼 클릭")} />}
      />
    </SafeAreaView>
  );
}
