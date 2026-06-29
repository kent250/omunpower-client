import { colors } from './colors';
import { typography } from './typography';

export const theme = {
  colors,
  typography,
  radius: {
    sm: 8,
    md: 12,
    lg: 14,
    xl: 16,
    '2xl': 20,
    full: 999,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    '4xl': 48,
    '5xl': 60,
  },
};

export type Theme = typeof theme;