import EmailInput from "@/components/EmailInput";
import FixedButtomCTA from "@/components/FixedButtomCTA";
import PasswordInput from "@/components/PasswordInput";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const loginForm = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    console.log(formValues);
  };

  return (
    <FormProvider {...loginForm}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput />
      </View>
      <FixedButtomCTA
        label="로그인하기"
        onPress={loginForm.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    gap: 16
  }
});
