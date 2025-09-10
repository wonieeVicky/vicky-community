import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

function PasswordInput() {
  const { control } = useFormContext();
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
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          value={value}
          onChangeText={onChange}
          error={error?.message}
          secureTextEntry
        />
      )}
    />
  );
}

export default PasswordInput;
