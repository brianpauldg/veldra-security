import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ─── Bloom Metabolics brand system (LOCKED) ───
        graphite: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#020202',
        },
        ink: '#0d0c0a',
        obsidian: '#050404',
        champagne: '#d8cfbe',
        brass: '#8a8268',
        bronze: '#B8A688',
        cream: '#F0E8DA',
        muted: '#C8BFB0',
        // Legacy — retained for existing components during migration
        nova: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e5e5e7',
          300: '#d4d4d8',
          400: '#b8b8bd',
          500: '#8a8a8f',
          600: '#6b6b70',
          700: '#4a4a4e',
          800: '#2d2d30',
          900: '#1a1a1d',
        },
        ice: {
          400: '#93c5fd',
          500: '#60a5fa',
          600: '#3b82f6',
        },
      },
      fontFamily: {
        sans: ['InterVariable', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Fraunces', 'Lora', 'Georgia', '"Times New Roman"', 'serif'],
        serif: ['Lora', 'Georgia', '"Times New Roman"', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.02', letterSpacing: '-0.04em', fontWeight: '700' }],
        'display-lg': ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.035em', fontWeight: '700' }],
        'display': ['2.75rem', { lineHeight: '1.08', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-sm': ['2rem', { lineHeight: '1.12', letterSpacing: '-0.025em', fontWeight: '600' }],
        'headline': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.015em', fontWeight: '600' }],
        'subheadline': ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.005em', fontWeight: '400' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
