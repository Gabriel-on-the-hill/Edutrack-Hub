import { motion } from 'framer-motion';

export default function FadeInUp({ children, delay = 0, duration = 0.5 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay,
        duration,
      }}
    >
      {children}
    </motion.div>
  );
}
