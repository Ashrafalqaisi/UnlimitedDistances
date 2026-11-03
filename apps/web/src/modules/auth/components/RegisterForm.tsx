'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent, type InputHTMLAttributes, type ReactNode } from 'react';
import {
  ApiError,
  normalizePhone,
  passwordChecks,
  register,
  validateRegisterForm,
  type PasswordCheck,
  type RegisterForm as RegisterFormValues,
} from '@runner/shared';
import { API_URL, type Locale } from '@/modules/common';
import type { AuthDictionary } from '../i18n';
import { WELCOME_EMAIL_KEY } from '../welcome';

type FieldName = keyof RegisterFormValues;
type FieldErrors = Partial<Record<FieldName, keyof AuthDictionary['fieldErrors']>>;

const emptyForm: RegisterFormValues = {
  fullName: '',
  email: '',
  username: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

/** Maps the API's "already registered" conflicts onto the field they belong to. */
function conflictErrors(message: string): FieldErrors | null {
  if (/email/i.test(message)) return { email: 'emailTaken' };
  if (/username/i.test(message)) return { username: 'usernameTaken' };
  if (/phone/i.test(message)) return { phone: 'phoneTaken' };
  return null;
}

export function RegisterForm({ locale, t }: { locale: Locale; t: AuthDictionary }) {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
      // Tokens are not stored yet; session handling comes with the cookie-session step.
      await register(API_URL, {
        fullName: form.fullName.trim(),
        email,
        username: form.username.trim().toLowerCase(),
        phone: normalizePhone(form.phone) || undefined,
        password: form.password,
        locale,
      });
      try {
        sessionStorage.setItem(WELCOME_EMAIL_KEY, email);
      } catch {
        // Storage can be blocked; the account is created either way
      }
      router.push(`/${locale}`);
    } catch (error) {
      const conflict = error instanceof ApiError && error.status === 409 ? conflictErrors(error.message) : null;
      if (conflict) {
        setErrors(conflict);
        setFormError(t.register.fixErrors);
      } else {
        setFormError(error instanceof ApiError ? error.message : t.networkError);
      }
      setSubmitting(false);
    }
  }

  // Props for one field: controlled value, and editing clears that field's error
  function field(name: FieldName) {
    const code = errors[name];
    return {
      name,
      value: form[name],
      error: code ? t.fieldErrors[code] : undefined,
      onChange: (value: string) => {
        setForm((current) => ({ ...current, [name]: value }));
        setErrors((current) => ({ ...current, [name]: undefined }));
      },
    };
  }

  const checks = passwordChecks(form.password);

  return (
    <form className="auth-form" onSubmit={onSubmit} noValidate>
      <Field label={t.register.fullName} {...field('fullName')} autoComplete="name" />
      <Field
        label={t.register.email}
        {...field('email')}
        type="email"
        autoComplete="email"
        spellCheck={false}
        dir="ltr"
      />
      <Field
        label={t.register.username}
        {...field('username')}
        hint={t.register.usernameHint}
        autoComplete="username"
        autoCapitalize="none"
        spellCheck={false}
        dir="ltr"
      />
      <Field
        label={t.register.phone}
        {...field('phone')}
        hint={t.register.phoneHint}
        type="tel"
        autoComplete="tel"
        dir="ltr"
      />
      <Field
        label={t.register.password}
        {...field('password')}
        type="password"
        autoComplete="new-password"
        dir="ltr"
      >
        <ul className="password-checks">
          {(Object.keys(checks) as PasswordCheck[]).map((key) => (
            <li key={key} className={checks[key] ? 'met' : undefined}>
              {t.passwordChecks[key]}
            </li>
          ))}
        </ul>
      </Field>
      <Field
        label={t.register.confirmPassword}
        {...field('confirmPassword')}
        type="password"
        autoComplete="new-password"
        dir="ltr"
      />

      {formError && (
        <p className="form-result error" role="alert">
          {formError}
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? t.register.submitting : t.register.submit}
      </button>
    </form>
  );
}

interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label: string;
  name: FieldName;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  children?: ReactNode;
}

function Field({ label, name, value, onChange, error, hint, children, ...inputProps }: FieldProps) {
  const noteId = error || hint ? `${name}-note` : undefined;

  return (
    <label>
      {label}
      <input
        {...inputProps}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={noteId}
      />
      {noteId && (
        <span id={noteId} className={error ? 'field-error' : 'field-hint'}>
          {error ?? hint}
        </span>
      )}
      {children}
    </label>
  );
}
