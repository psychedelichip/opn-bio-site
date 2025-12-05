import { useState, useEffect } from 'react';
import { translations, type Language } from './translations';

export function useTranslation() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('tr')) {
      setLanguage('tr');
    }

    // Check for saved preference
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'tr')) {
      setLanguage(savedLang);
    }
  }, []);

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return {
    t: translations[language],
    language,
    switchLanguage,
  };
}
