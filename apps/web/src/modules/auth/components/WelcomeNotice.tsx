'use client';

import { useEffect, useState } from 'react';
import { WELCOME_EMAIL_KEY } from '../welcome';

interface WelcomeNoticeProps {
  title: string;
  /** Contains an "{email}" placeholder. */
  message: string;
  dismiss: string;
}

/** Shown once on the home page right after sign-up, reminding the runner to confirm their email. */
export function WelcomeNotice({ title, message, dismiss }: WelcomeNoticeProps) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(WELCOME_EMAIL_KEY);
      if (stored) {
        sessionStorage.removeItem(WELCOME_EMAIL_KEY);
        setEmail(stored);
      }
    } catch {
      // Storage can be blocked; then there is simply no notice
    }
  }, []);

  if (!email) return null;

  return (
    <div className="welcome-notice" role="status">
      <div className="container welcome-notice-inner">
        <p>
          <strong>{title}</strong> {message.replace('{email}', email)}
        </p>
        <button type="button" className="link-button" onClick={() => setEmail(null)}>
          {dismiss}
        </button>
      </div>
    </div>
  );
}
