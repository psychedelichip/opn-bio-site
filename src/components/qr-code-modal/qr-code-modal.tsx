import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { MdQrCode2, MdClose, MdDownload } from 'react-icons/md';
import styles from './qr-code-modal.module.css';

interface QRCodeModalProps {
  url: string;
  title: string;
}

export function QRCodeModal({ url, title }: QRCodeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const downloadQR = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = 512;
    canvas.height = 512;

    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `${title}-qr-code.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <>
      <motion.button
        className={styles.button}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Show QR Code"
      >
        <MdQrCode2 />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.header}>
                <h3 className={styles.title}>QR Code</h3>
                <button
                  className={styles.closeButton}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                >
                  <MdClose />
                </button>
              </div>

              <div className={styles.qrContainer}>
                <QRCodeSVG
                  id="qr-code-svg"
                  value={url}
                  size={256}
                  level="H"
                  includeMargin={true}
                />
              </div>

              <p className={styles.description}>
                Scan this QR code to visit the profile
              </p>

              <motion.button
                className={styles.downloadButton}
                onClick={downloadQR}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MdDownload />
                Download QR Code
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
