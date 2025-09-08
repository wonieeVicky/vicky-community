import { colors } from "@/constants";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomButtons from "./CustomButtons";

interface FixedButtomCTAProps {
  label: string;
  onPress: () => void;
}

function FixedButtomCTA({ label, onPress }: FixedButtomCTAProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.fixed, { paddingBottom: insets.bottom || 12 }]}>
      <CustomButtons label={label} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  fixed: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_300,
    paddingTop: 12,
    paddingHorizontal: 16
  }
});

export default FixedButtomCTA;
