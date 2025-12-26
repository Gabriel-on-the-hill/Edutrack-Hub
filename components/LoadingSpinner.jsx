import { motion } from 'framer-motion';

export default function LoadingSpinner({ size = 'md', message = 'Loading...' }) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`${sizes[size]} border-4 border-gray-200 border-t-[#007C7A] rounded-full`}
      />
      {message && <p className="text-gray-600 font-medium">{message}</p>}
    </div>
  );
}
