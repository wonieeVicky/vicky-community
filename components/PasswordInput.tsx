import { Controller, useFormContext } from "react-hook-form";
import { TextInputProps } from "react-native";
import InputField from "./InputField";

interface PasswordInputProps {
  submitBehavior?: TextInputProps["submitBehavior"];
}

function PasswordInput({
  submitBehavior = "blurAndSubmit"
}: PasswordInputProps) {
  const { control, setFocus } = useFormContext();
  return (
    <Controller
      name="password"
      control={control}
      rules={{
        required: true,
        validate: (data: string) => {
          if (data.length < 8) {
            return "비밀번호는 8자 이상 입력해주세요.";
          }
          return true;
        }
      }}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          textContentType="oneTimeCode"
          submitBehavior={submitBehavior}
          value={value}
          onChangeText={onChange}
          error={error?.message}
          onSubmitEditing={() => setFocus("passwordConfirm")}
          secureTextEntry
        />
      )}
    />
  );
}

export default PasswordInput;
