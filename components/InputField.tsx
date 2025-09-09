import { colors } from "@/constants";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View
} from "react-native";

interface InputFieldProps extends TextInputProps {
  label?: string;
  variant?: "filled" | "standard" | "outlined";
  error?: string;
}

function InputField({
  label,
  variant = "filled",
  error = "",
  ...props
}: InputFieldProps) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.container,
          styles[variant],
          Boolean(error) && styles.inputError
        ]}
      >
        <TextInput
          placeholderTextColor={colors.GRAY_500}
          style={styles.input}
          {...props}
        />
      </View>
      {Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    color: colors.GRAY_700,
    marginBottom: 5
  },
  container: {
    height: 44,
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  filled: {
    backgroundColor: colors.GRAY_100
  },
  standard: {},
  outlined: {},
  input: {
    fontSize: 16,
    flex: 1,
    padding: 0
  },
  error: {
    fontSize: 12,
    marginTop: 5,
    color: colors.RED_500
  },
  inputError: {
    backgroundColor: colors.RED_100
  }
});

export default InputField;
