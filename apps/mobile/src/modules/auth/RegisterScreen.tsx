import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import {
  ApiError,
  normalizePhone,
  register,
  validateRegisterForm,
  type RegisterForm,
} from '@runner/shared';
import { API_URL, Button, Screen, useLanguage } from '@/modules/common';
import { FormField } from './components/FormField';
import { PasswordChecklist } from './components/PasswordChecklist';
import { authMessages, type AuthMessages } from './messages';
import { authStyles as styles } from './styles';

type FieldErrors = Partial<Record<keyof RegisterForm, keyof AuthMessages['fieldErrors']>>;

const emptyForm: RegisterForm = {
  fullName: '',
  email: '',
  username: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

/** Maps the API's "already registered" conflict codes onto the field they belong to. */
function conflictErrors(code: string | undefined): FieldErrors | null {
  if (code === 'EMAIL_TAKEN') return { email: 'emailTaken' };
  if (code === 'USERNAME_TAKEN') return { username: 'usernameTaken' };
  if (code === 'PHONE_TAKEN') return { phone: 'phoneTaken' };
  return null;
}

export function RegisterScreen() {
  const { t, text, row, lang } = useLanguage(authMessages);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Editing a field clears its error, so stale messages don't linger while the runner fixes them
  function update(field: keyof RegisterForm) {
    return (value: string) => {
      setForm((current) => ({ ...current, [field]: value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
    };
  }

  async function submit() {
    const found = validateRegisterForm(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setFormError(t.register.fixErrors);
      return;
    }

    setSubmitting(true);
    setFormError(null);
    const email = form.email.trim().toLowerCase();
    try {
      // Tokens are not stored yet; session handling comes with the secure-storage step.
      await register(API_URL, {
        fullName: form.fullName.trim(),
        email,
        username: form.username.trim().toLowerCase(),
        phone: normalizePhone(form.phone) || undefined,
        password: form.password,
        locale: lang,
      });
      Alert.alert(t.register.welcomeTitle, t.register.welcomeMessage(email), [{ text: t.register.ok }]);
      router.dismissTo('/');
    } catch (error) {
      const conflict = error instanceof ApiError && error.status === 409 ? conflictErrors(error.code) : null;
      if (conflict) {
        setErrors(conflict);
        setFormError(t.register.fixErrors);
      } else {
        setFormError(error instanceof ApiError ? error.message : t.networkError);
      }
    } finally {
      setSubmitting(false);
    }
  }

  const fieldError = (field: keyof RegisterForm) => {
    const code = errors[field];
    return code ? t.fieldErrors[code] : undefined;
  };

  return (
    <Screen inset="none">
      <View style={styles.container}>
        <Text style={[styles.title, text]}>{t.register.title}</Text>
        <Text style={[styles.subtitle, text]}>{t.register.subtitle}</Text>

        <View style={styles.form}>
          <FormField
            label={t.register.fullName}
            icon="person-outline"
            value={form.fullName}
            onChangeText={update('fullName')}
            error={fieldError('fullName')}
            autoComplete="name"
            textContentType="name"
            returnKeyType="next"
          />

          <FormField
            label={t.register.email}
            icon="mail-outline"
            value={form.email}
            onChangeText={update('email')}
            error={fieldError('email')}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            returnKeyType="next"
          />

          <FormField
            label={t.register.username}
            icon="at-outline"
            value={form.username}
            onChangeText={update('username')}
            error={fieldError('username')}
            hint={t.register.usernameHint}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="username-new"
            textContentType="username"
            returnKeyType="next"
          />

          <FormField
            label={t.register.phone}
            icon="call-outline"
            value={form.phone}
            onChangeText={update('phone')}
            error={fieldError('phone')}
            hint={t.register.phoneHint}
            autoComplete="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            returnKeyType="next"
          />

          <FormField
            label={t.register.password}
            icon="lock-closed-outline"
            value={form.password}
            onChangeText={update('password')}
            error={fieldError('password')}
            secureTextEntry
            autoComplete="new-password"
            textContentType="newPassword"
            returnKeyType="next"
          >
            <PasswordChecklist password={form.password} labels={t.passwordChecks} />
          </FormField>

          <FormField
            label={t.register.confirmPassword}
            icon="lock-closed-outline"
            value={form.confirmPassword}
            onChangeText={update('confirmPassword')}
            error={fieldError('confirmPassword')}
            secureTextEntry
            autoComplete="new-password"
            textContentType="newPassword"
            returnKeyType="go"
            onSubmitEditing={submit}
          />
        </View>

        {formError && <Text style={[styles.result, styles.error, text]}>{formError}</Text>}

        <Button
          label={submitting ? t.register.submitting : t.register.submit}
          size="lg"
          block
          loading={submitting}
          onPress={submit}
          style={styles.submit}
        />

        <View style={[styles.switchRow, row]}>
          <Text style={styles.switchText}>{t.register.haveAccount}</Text>
          <Link href="/login" replace style={styles.switchLink}>
            {t.register.signIn}
          </Link>
        </View>
      </View>
    </Screen>
  );
}
