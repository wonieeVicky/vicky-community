import EmailInput from "@/components/EmailInput";
import FixedButtomCTA from "@/components/FixedButtomCTA";
import PasswordConfirmInput from "@/components/PasswordConfirmInput";
import PasswordInput from "@/components/PasswordInput";
import useAuth from "@/hooks/queries/useAuth";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

type FormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function SignupScreen() {
  const { signupMutation } = useAuth();
  const signupForm = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: ""
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    const { email, password } = formValues;
    signupMutation.mutate({ email, password });
  };

  return (
    <FormProvider {...signupForm}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput submitBehavior="submit" />
        <PasswordConfirmInput />
      </View>
      <FixedButtomCTA
        label="회원가입하기"
        onPress={signupForm.handleSubmit(onSubmit)}
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
