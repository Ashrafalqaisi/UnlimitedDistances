import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { ApiError, login, resendVerification } from '@runner/shared';
import { API_URL, colors, Page, useLanguage } from '@/modules/common';
import { FormField } from './components/FormField';
import { authMessages } from './messages';
import { authStyles as styles } from './styles';

type Result =
  | { kind: 'error' | 'success'; message: string }
  // Set when the password was right but the email isn't confirmed yet; holds the address to resend to
  | { kind: 'unverified'; message: string; email: string }
  | null;

export function LoginScreen() {
  const { t, text, row } = useLanguage(authMessages);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [result, setResult] = useState<Result>(null);

  async function submit() {
    if (!identifier.trim() || !password) {
      setResult({ kind: 'error', message: t.required });
      return;
    }
    setSubmitting(true);
    setResult(null);
    try {
      // Tokens are not stored yet; session handling comes with the secure-storage step.
      await login(API_URL, { identifier: identifier.trim(), password });
      setResult({ kind: 'success', message: t.success });
    } catch (error) {
      if (error instanceof ApiError && error.code === 'EMAIL_NOT_VERIFIED') {
        setResult({ kind: 'unverified', message: t.notVerified, email: String(error.details.email ?? '') });
      } else {
        const message =
          error instanceof ApiError
            ? error.status === 401
              ? t.invalidCredentials
              : error.message
            : t.networkError;
        setResult({ kind: 'error', message });
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function resend() {
    if (result?.kind !== 'unverified') return;
    setResending(true);
    try {
      await resendVerification(API_URL, result.email);
      setResult({ kind: 'success', message: t.resent });
    } catch {
      setResult({ kind: 'error', message: t.networkError });
    } finally {
      setResending(false);
    }
  }

  return (
    <Page>
      <View style={styles.container}>
        <Text style={[styles.title, text]}>{t.title}</Text>
        <Text style={[styles.subtitle, text]}>{t.subtitle}</Text>

        <FormField
          label={t.identifier}
          value={identifier}
          onChangeText={setIdentifier}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="username"
          keyboardType="email-address"
          textContentType="username"
          returnKeyType="next"
        />

        <FormField
          label={t.password}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
          textContentType="password"
          returnKeyType="go"
          onSubmitEditing={submit}
        />

        {result && (
          <Text style={[styles.result, result.kind === 'success' ? styles.success : styles.error, text]}>
            {result.message}
          </Text>
        )}

        {result?.kind === 'unverified' && result.email !== '' && (
          <Pressable onPress={resend} disabled={resending} style={styles.textButton} accessibilityRole="button">
            <Text style={[styles.textButtonText, text]}>{t.resend}</Text>
          </Pressable>
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

        <View style={[styles.switchRow, row]}>
          <Text style={styles.switchText}>{t.noAccount}</Text>
          <Link href="/register" style={styles.switchLink}>
            {t.createAccount}
          </Link>
        </View>
      </View>
    </Page>
  );
}
