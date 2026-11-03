'use client';

import { useState, type FormEvent } from 'react';
import { ApiError, login } from '@runner/shared';
import { API_URL } from '@/modules/common';
import type { AuthDictionary } from '../i18n';

type Result = { kind: 'error' | 'success'; message: string } | null;

export function LoginForm({ t }: { t: AuthDictionary }) {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    setResult(null);
    try {
      // Tokens are not stored yet; session handling comes with the cookie-session step.
      await login(API_URL, {
        email: String(form.get('email')).trim(),
        password: String(form.get('password')),
      });
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
    <form className="auth-form" onSubmit={onSubmit}>
      <label>
        {t.email}
        <input name="email" type="email" autoComplete="email" required dir="ltr" />
      </label>
      <label>
        {t.password}
        <input name="password" type="password" autoComplete="current-password" required dir="ltr" />
      </label>

      {result && (
        <p className={`form-result ${result.kind}`} role={result.kind === 'error' ? 'alert' : 'status'}>
          {result.message}
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? t.submitting : t.submit}
      </button>
    </form>
  );
}
