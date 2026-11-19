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
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        card: 'hsl(var(--card))',
        border: 'hsl(var(--border))',
        'ff-deep': '#000000',
        'ff-surface': '#0D0D0D',
        'ff-elevated': '#141414',
        'ff-glass': 'rgba(13, 13, 13, 0.78)',
        'ff-glass-light': 'rgba(255, 255, 255, 0.85)',
        'ff-gold': {
          DEFAULT: '#FFFFFF',
          light: '#F4F4F5',
          amber: '#D4D4D8',
          glow: 'rgba(255, 255, 255, 0.14)',
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
        serif: ['"Instrument Serif"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        'instrument-serif': ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', 'sans-serif'],
        mono: ['"SF Mono"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'macos-window': '0 24px 60px -12px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.12)',
        'macos-window-light': '0 24px 60px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.08)',
        'gold-glow': '0 0 25px rgba(255, 255, 255, 0.12)',
        'dock': '0 16px 40px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.14)',
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
