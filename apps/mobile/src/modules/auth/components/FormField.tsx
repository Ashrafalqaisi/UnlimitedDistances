import type { ReactNode } from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { colors, useLanguage } from '@/modules/common';
import { ERROR_COLOR } from '../styles';

interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
  hint?: string;
  children?: ReactNode;
}

/** Labelled text input with an optional hint, error message, and extra content below it. */
export function FormField({ label, error, hint, children, style, ...inputProps }: FormFieldProps) {
  const { text } = useLanguage();

  return (
    <View>
      <Text style={[styles.label, text]}>{label}</Text>
      <TextInput
        {...inputProps}
        style={[styles.input, text, error ? styles.inputError : null, style]}
        accessibilityLabel={label}
        accessibilityHint={error ?? hint}
      />
      {error ? (
        <Text style={[styles.error, text]}>{error}</Text>
      ) : hint ? (
        <Text style={[styles.hint, text]}>{hint}</Text>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.ink,
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.ink,
    backgroundColor: colors.surface,
  },
  inputError: {
    borderColor: ERROR_COLOR,
  },
  error: {
    marginTop: 5,
    fontSize: 13,
    color: ERROR_COLOR,
  },
  hint: {
    marginTop: 5,
    fontSize: 13,
    color: colors.muted,
  },
});
