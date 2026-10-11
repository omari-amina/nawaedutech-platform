import React, { createContext, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export type AppLanguage = 'ar' | 'fr' | 'en';

interface LanguageContextType {
  language: string;
  isRTL: boolean;
  toggleLanguage: () => void;
  setLanguage: (lang: AppLanguage) => void;
}

const ORDER: AppLanguage[] = ['ar', 'fr', 'en'];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const language = i18n.language?.startsWith('fr') ? 'fr' : i18n.language === 'en' ? 'en' : 'ar';
  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [isRTL, language]);

  const setLanguage = (lang: AppLanguage) => {
    i18n.changeLanguage(lang);
    try {
      localStorage.setItem('nawa_lang', lang);
    } catch { /* ignore */ }
  };

  const toggleLanguage = () => {
    const idx = ORDER.indexOf(language as AppLanguage);
    setLanguage(ORDER[(idx + 1) % ORDER.length]);
  };

  return (
    <LanguageContext.Provider value={{ language, isRTL, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
