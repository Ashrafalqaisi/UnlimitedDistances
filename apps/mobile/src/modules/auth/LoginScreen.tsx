import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ApiError, login } from '@runner/shared';
import { API_URL, colors, Page, useLanguage } from '@/modules/common';
import { authMessages } from './messages';

type Result = { kind: 'error' | 'success'; message: string } | null;

export function LoginScreen() {
  const { t, text } = useLanguage(authMessages);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result>(null);

  async function submit() {
    if (!email.trim() || !password) {
      setResult({ kind: 'error', message: t.required });
      return;
    }
    setSubmitting(true);
    setResult(null);
    try {
      // Tokens are not stored yet; session handling comes with the secure-storage step.
      await login(API_URL, { email: email.trim(), password });
      setResult({ kind: 'success', message: t.success });
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.status === 401
            ? t.invalidCredentials
            : error.message
          : t.networkError;
      setResult({ kind: 'error', message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Page>
      <View style={styles.container}>
        <Text style={[styles.title, text]}>{t.title}</Text>
        <Text style={[styles.subtitle, text]}>{t.subtitle}</Text>

        <Text style={[styles.label, text]}>{t.email}</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={[styles.input, text]}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          returnKeyType="next"
        />

        <Text style={[styles.label, text]}>{t.password}</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={[styles.input, text]}
          secureTextEntry
          autoComplete="password"
          textContentType="password"
          returnKeyType="go"
          onSubmitEditing={submit}
        />

        {result && (
          <Text style={[styles.result, result.kind === 'error' ? styles.error : styles.success, text]}>
            {result.message}
          </Text>
        )}

        <Pressable
          onPress={submit}
          disabled={submitting}
          style={[styles.button, submitting && styles.buttonBusy]}
          accessibilityRole="button"
        >
          {submitting && <ActivityIndicator color={colors.white} />}
          <Text style={styles.buttonText}>{submitting ? t.submitting : t.submit}</Text>
        </Pressable>
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 36,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.ink,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.muted,
    marginTop: 8,
    marginBottom: 24,
  },
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
  result: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: '600',
  },
  error: {
    color: '#b42318',
  },
  success: {
    color: colors.success,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 24,
    backgroundColor: colors.brand,
    borderRadius: 999,
    paddingVertical: 15,
  },
  buttonBusy: {
    opacity: 0.7,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
