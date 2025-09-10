import { Controller, useFormContext, useWatch } from "react-hook-form";
import InputField from "./InputField";

function PasswordConfirmInput() {
  const { control } = useFormContext();
  const password = useWatch({ control, name: "password" });
  return (
    <Controller
      name="passwordConfirm"
      control={control}
      rules={{
        required: true,
        validate: (data: string) => {
          if (password !== data) {
            return "비밀번호가 일치하지 않습니다.";
          }
          return true;
        }
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          label="비밀번호 확인"
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

export default PasswordConfirmInput;
