import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import { messages, type Lang } from '@/messages';

const LanguageContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void } | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const value = useMemo(() => ({ lang, setLang }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  const { lang, setLang } = context;
  const isRTL = lang === 'ar';

  // Direction is applied per element, so switching language works without restarting the app.
  const text: TextStyle = {
    textAlign: isRTL ? 'right' : 'left',
    writingDirection: isRTL ? 'rtl' : 'ltr',
  };
  const row: ViewStyle = { flexDirection: isRTL ? 'row-reverse' : 'row' };

  return {
    lang,
    isRTL,
    t: messages[lang],
    text,
    row,
    toggle: () => setLang(isRTL ? 'en' : 'ar'),
  };
}
