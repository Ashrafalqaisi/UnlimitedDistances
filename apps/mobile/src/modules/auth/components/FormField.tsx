import { useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { colors, Icon, radius, space, type, useLanguage, type IconName } from '@/modules/common';
import { authMessages } from '../messages';
import { ERROR_COLOR } from '../styles';

interface FormFieldProps extends TextInputProps {
  label: string;
  icon?: IconName;
  error?: string;
  hint?: string;
  children?: ReactNode;
}

/**
 * Labelled text input with a leading icon, focus ring, optional hint or error, and
 * a show/hide toggle for password fields.
 */
export function FormField({ label, icon, error, hint, children, secureTextEntry, ...inputProps }: FormFieldProps) {
  const { t, text, row } = useLanguage(authMessages);
  const [focused, setFocused] = useState(false);
  const [revealed, setRevealed] = useState(false);

  return (
    <View>
      <Text style={[styles.label, text]}>{label}</Text>
      <View style={[styles.box, row, focused && styles.boxFocused, error ? styles.boxError : null]}>
        {icon && <Icon name={icon} size={18} color={focused ? colors.brand : colors.subtle} />}
        <TextInput
          {...inputProps}
          secureTextEntry={secureTextEntry && !revealed}
          onFocus={(event) => {
            setFocused(true);
            inputProps.onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            inputProps.onBlur?.(event);
          }}
          placeholderTextColor={colors.subtle}
          selectionColor={colors.brand}
          style={[styles.input, text]}
          accessibilityLabel={label}
          accessibilityHint={error ?? hint}
        />
        {secureTextEntry && (
          <Pressable
            onPress={() => setRevealed((value) => !value)}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={revealed ? t.hidePassword : t.showPassword}
          >
            <Icon name={revealed ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.muted} />
          </Pressable>
        )}
      </View>
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
    ...type.label,
    fontWeight: '700',
    color: colors.ink,
    marginBottom: space.sm,
  },
  box: {
    alignItems: 'center',
    gap: space.sm,
    minHeight: 52,
    paddingHorizontal: space.lg,
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: radius.md,
    backgroundColor: colors.white,
  },
  boxFocused: {
    borderColor: colors.brand,
  },
  boxError: {
    borderColor: ERROR_COLOR,
  },
  input: {
    flex: 1,
    paddingVertical: space.md,
    fontSize: 16,
    color: colors.ink,
  },
  error: {
    ...type.caption,
    fontWeight: '500',
    marginTop: space.xs + 2,
    color: ERROR_COLOR,
  },
  hint: {
    ...type.caption,
    fontWeight: '400',
    marginTop: space.xs + 2,
    color: colors.muted,
  },
});
