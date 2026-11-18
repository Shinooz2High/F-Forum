/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        'ff-deep': '#07090E',
        'ff-surface': '#0B0F17',
        'ff-elevated': '#111827',
        'ff-glass': 'rgba(17, 24, 39, 0.72)',
        'ff-glass-light': 'rgba(255, 255, 255, 0.78)',
        'ff-gold': {
          DEFAULT: '#EAB308',
          light: '#FBBF24',
          amber: '#F59E0B',
          glow: 'rgba(234, 179, 8, 0.25)',
        },
        'ff-rose': '#F43F5E',
        'ff-jade': '#10B981',
        'ff-blue': '#3B82F6',
        'macos': {
          close: '#FF5F57',
          minimize: '#FEBC2E',
          maximize: '#28C840',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', 'sans-serif'],
        mono: ['"SF Mono"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'macos-window': '0 24px 60px -12px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'macos-window-light': '0 24px 60px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.08)',
        'gold-glow': '0 0 25px rgba(234, 179, 8, 0.35)',
        'dock': '0 12px 36px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
        '2xl': '40px',
        '3xl': '60px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
};
