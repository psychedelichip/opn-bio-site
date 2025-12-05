import { useState, useEffect } from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { motion } from 'framer-motion';
import styles from './theme-switcher.module.css';

export function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const isDarkMode = savedTheme === 'dark';
    setIsDark(isDarkMode);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      data-theme={isDark ? 'dark' : 'light'}
    >
      <motion.div
        className={styles.slider}
        animate={{ x: isDark ? 0 : 24 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {isDark ? <MdDarkMode /> : <MdLightMode />}
      </motion.div>
      <span className={styles.iconLeft}>
        <MdDarkMode />
      </span>
      <span className={styles.iconRight}>
        <MdLightMode />
      </span>
    </button>
  );
}
