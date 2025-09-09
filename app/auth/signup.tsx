import FixedButtomCTA from "@/components/FixedButtomCTA";
import InputField from "@/components/InputField";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function SignupScreen() {
  const [signupValues, setSignupValues] = useState({
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const handleChange = (text: string, name: string) => {
    setSignupValues((prev) => ({ ...prev, [name]: text }));
  };

  const handleSubmit = () => {
    if (signupValues.email.length === 0) {
      setErrors((prev) => ({ ...prev, email: "이메일을 입력해주세요." }));
      return;
    }
    if (signupValues.password.length === 0) {
      setErrors((prev) => ({ ...prev, password: "비밀번호를 입력해주세요." }));
      return;
    }
    if (signupValues.passwordConfirm.length === 0) {
      setErrors((prev) => ({
        ...prev,
        passwordConfirm: "비밀번호를 입력해주세요."
      }));
      return;
    }
    if (signupValues.password !== signupValues.passwordConfirm) {
      setErrors((prev) => ({
        ...prev,
        passwordConfirm: "비밀번호가 일치하지 않습니다."
      }));
      return;
    }
    console.log(signupValues);
  };

  return (
    <>
      <View style={styles.container}>
        <InputField
          label="이메일"
          placeholder="이메일을 입력해주세요."
          value={signupValues.email}
          onChangeText={(text) => handleChange(text, "email")}
          error={errors.email}
        />
        <InputField
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          value={signupValues.password}
          onChangeText={(text) => handleChange(text, "password")}
        />
        <InputField
          label="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요."
          value={signupValues.passwordConfirm}
          onChangeText={(text) => handleChange(text, "passwordConfirm")}
        />
      </View>
      <FixedButtomCTA label="회원가입하기" onPress={handleSubmit} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    gap: 16
  }
});
