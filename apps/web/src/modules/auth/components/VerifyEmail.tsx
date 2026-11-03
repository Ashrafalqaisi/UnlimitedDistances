'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ApiError, verifyEmail } from '@runner/shared';
import { API_URL, type Locale } from '@/modules/common';
import type { AuthDictionary } from '../i18n';

type Status = 'verifying' | 'success' | 'failed' | 'missing' | 'networkError';

export function VerifyEmail({ locale, token, t }: { locale: Locale; token: string | null; t: AuthDictionary }) {
  const [status, setStatus] = useState<Status>(token ? 'verifying' : 'missing');
  // A link works only once, so make sure the development double-run of effects doesn't spend it twice
  const started = useRef(false);

  useEffect(() => {
    if (!token || started.current) return;
    started.current = true;
    verifyEmail(API_URL, token)
      .then(() => setStatus('success'))
      .catch((error) => setStatus(error instanceof ApiError ? 'failed' : 'networkError'));
  }, [token]);

  const message =
    status === 'verifying' ? t.verify.verifying : status === 'networkError' ? t.networkError : t.verify[status];
  const isError = status !== 'verifying' && status !== 'success';

  return (
    <>
      <p
        className={status === 'verifying' ? 'muted' : `form-result ${isError ? 'error' : 'success'}`}
        role={isError ? 'alert' : 'status'}
      >
        {message}
      </p>
      {status !== 'verifying' && (
        <Link href={`/${locale}/login`} className="btn btn-primary auth-action">
          {t.verify.signIn}
        </Link>
      )}
    </>
  );
}
