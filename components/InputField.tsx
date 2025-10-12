﻿import { colors } from "@/constants";
import { ForwardedRef, forwardRef } from "react";
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
  rightChild?: React.ReactNode;
}

function InputField(
  {
    label,
    variant = "filled",
    error = "",
    rightChild = null,
    ...props
  }: InputFieldProps,
  ref?: ForwardedRef<TextInput>
) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.container,
          styles[variant],
          props.multiline && styles.multiline,
          Boolean(error) && styles.inputError
        ]}
      >
        <TextInput
          ref={ref}
          placeholderTextColor={colors.GRAY_500}
          style={styles.input}
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          {...props}
        />
        {rightChild && rightChild}
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
  },
  multiline: {
    alignItems: "flex-start",
    paddingVertical: 10,
    height: 200
  }
});

export default forwardRef(InputField);
