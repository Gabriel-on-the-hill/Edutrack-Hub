/**
 * BRAND TOKENS & DESIGN SYSTEM
 * 
 * Centralized design tokens for consistent branding across the application
 * 
 * EDIT INSTRUCTIONS:
 * - Update colors to match your brand board
 * - Adjust spacing, typography, and shadows as needed
 * - Use these tokens in components for consistency
 * 
 * Usage:
 * ```jsx
 * import { colors, spacing, typography } from '../lib/brandTokens';
 * 
 * <div style={{ color: colors.primary, padding: spacing.md }}>
 *   Content
 * </div>
 * ```
 */

// ============================================================================
// COLOR PALETTE - From EduTrack Hub Brand Board
// ============================================================================

export const colors = {
  // Primary: EduTrack Teal
  primary: {
    50: '#f0fdf9',
    100: '#ccf0eb',
    200: '#99e1d7',
    300: '#66d2c3',
    400: '#33c3af',
    500: '#007C7A', // Main brand color
    600: '#006b69',
    700: '#005a58',
    800: '#004947',
    900: '#003836',
  },

  // Secondary: EduTrack Gold
  secondary: {
    50: '#fffbf0',
    100: '#fef3d9',
    200: '#fde7b3',
    300: '#fcdb8d',
    400: '#fbcf67',
    500: '#D0542E', // Main gold color
    600: '#b84a27',
    700: '#a04020',
    800: '#883619',
    900: '#702c12',
  },

  // Success: Success Green
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#145231',
  },

  // Warning: Warning Yellow
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  // Error: Error Red
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  // Neutral: Grayscale
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  // Semantic colors
  text: {
    primary: '#212121', // neutral-900
    secondary: '#616161', // neutral-700
    tertiary: '#9e9e9e', // neutral-500
    disabled: '#bdbdbd', // neutral-400
    inverse: '#ffffff',
  },

  background: {
    primary: '#ffffff',
    secondary: '#fafafa', // neutral-50
    tertiary: '#f5f5f5', // neutral-100
  },

  border: {
    light: '#eeeeee', // neutral-200
    default: '#e0e0e0', // neutral-300
    dark: '#bdbdbd', // neutral-400
  },
};

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  // Font families
  fontFamily: {
    heading: "'Poppins', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'Fira Code', monospace",
  },

  // Font sizes
  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
    '6xl': '3.75rem', // 60px
  },

  // Font weights
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// ============================================================================
// SPACING
// ============================================================================

export const spacing = {
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  7: '1.75rem', // 28px
  8: '2rem', // 32px
  9: '2.25rem', // 36px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  14: '3.5rem', // 56px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  28: '7rem', // 112px
  32: '8rem', // 128px
  36: '9rem', // 144px
  40: '10rem', // 160px
  44: '11rem', // 176px
  48: '12rem', // 192px
  52: '13rem', // 208px
  56: '14rem', // 224px
  60: '15rem', // 240px
  64: '16rem', // 256px
  72: '18rem', // 288px
  80: '20rem', // 320px
  96: '24rem', // 384px
};

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const borderRadius = {
  none: '0',
  sm: '0.125rem', // 2px
  base: '0.25rem', // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  '2xl': '1rem', // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',
};

// ============================================================================
// SHADOWS
// ============================================================================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

// ============================================================================
// TRANSITIONS
// ============================================================================

export const transitions = {
  fast: '150ms ease-in-out',
  base: '200ms ease-in-out',
  slow: '300ms ease-in-out',
  slower: '500ms ease-in-out',
};

// ============================================================================
// BREAKPOINTS (for responsive design)
// ============================================================================

export const breakpoints = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// ============================================================================
// COMPONENT PRESETS
// ============================================================================

export const componentPresets = {
  // Button presets
  button: {
    primary: {
      bg: colors.primary[500],
      text: '#ffffff',
      hover: colors.primary[600],
      active: colors.primary[700],
    },
    secondary: {
      bg: colors.secondary[500],
      text: '#ffffff',
      hover: colors.secondary[600],
      active: colors.secondary[700],
    },
    outline: {
      bg: 'transparent',
      text: colors.primary[500],
      border: colors.primary[500],
      hover: colors.primary[50],
    },
    ghost: {
      bg: 'transparent',
      text: colors.text.primary,
      hover: colors.neutral[100],
    },
  },

  // Card presets
  card: {
    default: {
      bg: colors.background.primary,
      border: colors.border.light,
      shadow: shadows.base,
    },
    elevated: {
      bg: colors.background.primary,
      shadow: shadows.lg,
    },
    outlined: {
      bg: colors.background.primary,
      border: colors.border.default,
    },
  },

  // Input presets
  input: {
    default: {
      bg: colors.background.primary,
      border: colors.border.default,
      focus: colors.primary[500],
    },
    filled: {
      bg: colors.neutral[100],
      border: 'transparent',
      focus: colors.primary[500],
    },
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get color by path (e.g., 'primary.500', 'neutral.900')
 * 
 * @param {string} path - Color path (e.g., 'primary.500')
 * @returns {string} Color value
 */
export function getColor(path) {
  const keys = path.split('.');
  let value = colors;
  for (const key of keys) {
    value = value[key];
    if (!value) return undefined;
  }
  return value;
}

/**
 * Create a color with opacity
 * 
 * @param {string} color - Color value (hex or rgb)
 * @param {number} opacity - Opacity 0-1
 * @returns {string} Color with opacity
 */
export function withOpacity(color, opacity) {
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
}

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
  componentPresets,
  getColor,
  withOpacity,
};

