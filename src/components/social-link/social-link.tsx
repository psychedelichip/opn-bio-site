import { motion } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaMedium,
  FaDev,
  FaTwitch,
  FaDiscord,
  FaTelegram,
  FaReddit,
  FaStackOverflow,
  FaGlobe,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiLinkedin } from 'react-icons/si';
import styles from './social-link.module.css';

interface SocialLinkProps {
  url: string;
  title: string;
}

const getSocialIcon = (url: string) => {
  const lowerUrl = url.toLowerCase();

  if (lowerUrl.includes('github.com')) return <FaGithub />;
  if (lowerUrl.includes('linkedin.com')) return <SiLinkedin />;
  if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) return <FaXTwitter />;
  if (lowerUrl.includes('instagram.com')) return <FaInstagram />;
  if (lowerUrl.includes('youtube.com')) return <FaYoutube />;
  if (lowerUrl.includes('facebook.com')) return <FaFacebook />;
  if (lowerUrl.includes('medium.com')) return <FaMedium />;
  if (lowerUrl.includes('dev.to')) return <FaDev />;
  if (lowerUrl.includes('twitch.tv')) return <FaTwitch />;
  if (lowerUrl.includes('discord')) return <FaDiscord />;
  if (lowerUrl.includes('t.me') || lowerUrl.includes('telegram')) return <FaTelegram />;
  if (lowerUrl.includes('reddit.com')) return <FaReddit />;
  if (lowerUrl.includes('stackoverflow.com')) return <FaStackOverflow />;

  return <FaGlobe />;
};

export function SocialLink({ url, title }: SocialLinkProps) {
  return (
    <motion.a
      href={url}
      className={styles.link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <span className={styles.icon}>{getSocialIcon(url)}</span>
      <span className={styles.title}>{title}</span>
    </motion.a>
  );
}
