import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Alert({ type = 'info', message, onClose, duration = 5000 }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const colors = {
    success: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon: '✓' },
    error: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: '✕' },
    warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', icon: '!' },
    info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: 'ℹ' },
  };

  const color = colors[type] || colors.info;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`${color.bg} border ${color.border} rounded-lg p-4 mb-4 flex items-start gap-3`}
        >
          <span className={`${color.text} font-bold text-lg`}>{color.icon}</span>
          <p className={`${color.text} flex-1`}>{message}</p>
          <button
            onClick={() => {
              setIsVisible(false);
              onClose?.();
            }}
            className={`${color.text} hover:opacity-70 transition-opacity`}
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
