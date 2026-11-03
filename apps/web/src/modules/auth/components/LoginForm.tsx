'use client';

import { useState, type FormEvent } from 'react';
import { ApiError, login, resendVerification } from '@runner/shared';
import { API_URL } from '@/modules/common';
import type { AuthDictionary } from '../i18n';

type Result =
  | { kind: 'error' | 'success'; message: string }
  // Set when the password was right but the email isn't confirmed yet; holds the address to resend to
  | { kind: 'unverified'; message: string; email: string }
  | null;

export function LoginForm({ t }: { t: AuthDictionary }) {
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [result, setResult] = useState<Result>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    setResult(null);
    try {
      // Tokens are not stored yet; session handling comes with the cookie-session step.
      await login(API_URL, {
        identifier: String(form.get('identifier')).trim(),
        password: String(form.get('password')),
      });
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
    <form className="auth-form" onSubmit={onSubmit}>
      <label>
        {t.identifier}
        <input
          name="identifier"
          type="text"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          required
          dir="ltr"
        />
      </label>
      <label>
        {t.password}
        <input name="password" type="password" autoComplete="current-password" required dir="ltr" />
      </label>

      {result && (
        <p
          className={`form-result ${result.kind === 'success' ? 'success' : 'error'}`}
          role={result.kind === 'success' ? 'status' : 'alert'}
        >
          {result.message}
        </p>
      )}

      {result?.kind === 'unverified' && result.email !== '' && (
        <button type="button" className="link-button" onClick={resend} disabled={resending}>
          {t.resend}
        </button>
      )}

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? t.submitting : t.submit}
      </button>
    </form>
  );
}
