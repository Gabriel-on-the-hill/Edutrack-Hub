import { motion } from 'framer-motion';

export default function AnimatedCheckbox({ label, checked, onChange, name }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer mb-4">
      <motion.div
        animate={{
          backgroundColor: checked ? '#007C7A' : '#ffffff',
          borderColor: checked ? '#007C7A' : '#d1d5db',
        }}
        whileTap={{ scale: 0.95 }}
        className="w-6 h-6 border-2 rounded-md flex items-center justify-center flex-shrink-0"
      >
        {checked && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </motion.svg>
        )}
      </motion.div>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <span className="text-gray-700 font-medium">{label}</span>
    </label>
  );
}
