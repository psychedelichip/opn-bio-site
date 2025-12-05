import { useCallback, useEffect, useState } from 'react';
import { MdArrowOutward } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

import { Container } from '../container';
import { LanguageSwitcher } from '../language-switcher';
import { ThemeSwitcher } from '../theme-switcher';
import { SocialLink } from '../social-link';
import { ShareButton } from '../share-button';
import { QRCodeModal } from '../qr-code-modal';
import type { Profile as IProfile } from '@/types/profile';

import styles from './profile.module.css';
import { cn } from '@/helpers/styles';
import { ProfileSchema } from '@/validators/profile';
import { useTranslation } from '@/i18n/useTranslation';

interface ProfileProps {
  source: string;
  username: string;
}

export function Profile({ source, username }: ProfileProps) {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [errors, setErrors] = useState<
    Array<{ message: string; path: string }>
  >([]);
  const [error, setError] = useState('');

  const fetchProfile = useCallback(async () => {
    const res = await fetch(source);

    if (!res.ok) return setError(t.profile.notFound);

    const data = await res.json();

    const parsed = ProfileSchema.safeParse(data);

    if (!parsed.success) {
      setErrors(
        parsed.error.issues.map(issue => ({
          message: issue.message,
          path: issue.path.join(' → '),
        })),
      );
    } else {
      setProfile(parsed.data);
    }
  }, [source, t]);

  useEffect(() => {
    fetchProfile().catch(() =>
      setError(t.profile.invalidJson),
    );
  }, [fetchProfile, t]);

  useEffect(() => {
    if (profile?.name) {
      document.title = `${profile.name} — OPN`;
    }

    if (profile?.style?.theme === 'light') {
      document.body.style.background = 'var(--color-neutral-950)';
    }
  }, [profile]);

  if (error) {
    return (
      <div className={styles.singleError}>
        <Container>
          <div className={styles.errorControls}>
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
          <p className={styles.errorText}>{t.profile.errorPrefix} {error}</p>
        </Container>
      </div>
    );
  }

  if (errors.length > 0) {
    return (
      <Container>
        <div className={styles.errorControls}>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
        <div className={styles.errors}>
          <h1 className={styles.title}>{t.profile.wrongFormat}</h1>

          {errors.map((error, i) => (
            <p className={styles.error} key={i}>
              <span>[{error.path}]:</span> {error.message}
            </p>
          ))}
        </div>
      </Container>
    );
  }

  if (!profile) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      className={cn(
        profile.style?.theme === 'light' && styles.light,
        profile.style?.font === 'serif' && styles.serif,
      )}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Container>
        <motion.div className={styles.topBar} variants={itemVariants}>
          <div className={styles.logo} />
        </motion.div>

        <motion.header className={styles.header} variants={itemVariants}>
          <h1 className={styles.name}>{profile.name}</h1>
          <p className={styles.description}>{profile.description}</p>

          <motion.a
            className={styles.profileLink}
            href="https://x.com/imuratalpay"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            x.com/<strong>imuratalpay</strong>
          </motion.a>
        </motion.header>
        <motion.main variants={itemVariants}>
          {profile.sections &&
            profile.sections.map((section, index) => (
              <Section key={index} title={section.title} variants={itemVariants}>
                {section.type === 'list' ? (
                  <div className={styles.items}>
                    {section.items.map((item, index) => (
                      <div className={styles.item} key={index}>
                        {item.url ? (
                          <a className={styles.title} href={item.url}>
                            {item.title}
                            <span>
                              <MdArrowOutward />
                            </span>
                          </a>
                        ) : (
                          <p className={styles.title}>{item.title}</p>
                        )}

                        {item.description && (
                          <p className={styles.description}>
                            {item.description}
                          </p>
                        )}

                        {item.date && (
                          <p className={styles.date}>({item.date})</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : section.type === 'text' ? (
                  <p className={styles.text}>{section.content}</p>
                ) : null}
              </Section>
            ))}
        </motion.main>
      </Container>
    </motion.div>
  );
}

function Section({
  children,
  title,
  variants,
}: {
  children: React.ReactNode;
  title: string;
  variants?: any;
}) {
  return (
    <motion.section className={styles.section} variants={variants}>
      <h2 className={styles.title}>
        {title} <div />
      </h2>
      <div className={styles.content}>{children}</div>
    </motion.section>
  );
}
