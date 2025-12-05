import { useTranslation } from '@/i18n/useTranslation';
import styles from './language-switcher.module.css';

export function LanguageSwitcher() {
  const { language, switchLanguage } = useTranslation();

  return (
    <div className={styles.switcher}>
      <button
        className={language === 'en' ? styles.active : ''}
        onClick={() => switchLanguage('en')}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className={styles.separator}>/</span>
      <button
        className={language === 'tr' ? styles.active : ''}
        onClick={() => switchLanguage('tr')}
        aria-label="Türkçe'ye geç"
      >
        TR
      </button>
    </div>
  );
}
