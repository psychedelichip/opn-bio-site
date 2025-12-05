import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdShare, MdCheck, MdContentCopy } from 'react-icons/md';
import { FaXTwitter, FaLinkedin, FaFacebook, FaWhatsapp } from 'react-icons/fa6';
import { useTranslation } from '@/i18n/useTranslation';
import styles from './share-button.module.css';

interface ShareButtonProps {
  url: string;
  title: string;
}

export function ShareButton({ url, title }: ShareButtonProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={styles.container}>
      <motion.button
        className={styles.mainButton}
        onClick={handleNativeShare}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Share profile"
      >
        <MdShare />
      </motion.button>

      <AnimatePresence>
        {isOpen && !navigator.share && (
          <motion.div
            className={styles.menu}
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <motion.button
              className={styles.menuItem}
              onClick={copyToClipboard}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? <MdCheck /> : <MdContentCopy />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </motion.button>

            <motion.a
              href={shareUrls.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.menuItem}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaXTwitter />
              <span>Twitter</span>
            </motion.a>

            <motion.a
              href={shareUrls.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.menuItem}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin />
              <span>LinkedIn</span>
            </motion.a>

            <motion.a
              href={shareUrls.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.menuItem}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFacebook />
              <span>Facebook</span>
            </motion.a>

            <motion.a
              href={shareUrls.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.menuItem}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaWhatsapp />
              <span>WhatsApp</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
