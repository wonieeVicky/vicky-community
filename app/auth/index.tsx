import CustomButtons from "@/components/CustomButtons";
import { Link } from "expo-router";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";

export default function AuthScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButtons label="이메일 로그인" />
        <Link href={"/"} style={styles.signUpText}>
          이메일로 가입하기
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 2
  },
  buttonContainer: {
    paddingHorizontal: 32,
    flex: 1
  },
  logo: {
    width: 112,
    height: 112
  },
  signUpText: {
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 20
  }
});
