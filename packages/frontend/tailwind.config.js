/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        dark: {
          950: '#06070a',
          900: '#090a10',
          850: '#0e111a',
          800: '#141824',
          750: '#1a2030',
          700: '#232b40',
        },
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          900: '#064e3b',
        },
        cyber: {
          400: '#38bdf8',
          500: '#06b6d4',
          600: '#0891b2',
        },
        hyper: {
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
        },
        flame: {
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
        },
      },
      boxShadow: {
        'glow-emerald': '0 0 25px -4px rgba(16, 185, 129, 0.35)',
        'glow-violet': '0 0 25px -4px rgba(168, 85, 247, 0.35)',
        'glow-cyan': '0 0 25px -4px rgba(6, 182, 212, 0.35)',
        'glow-rose': '0 0 25px -4px rgba(244, 63, 94, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'marquee': 'marquee 28s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
