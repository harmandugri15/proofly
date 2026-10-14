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
          950: '#080c16',
          900: '#0e1426',
          850: '#141c34',
          800: '#1a2442',
          750: '#233054',
          700: '#2d3d6a',
        },
        studio: {
          coral: '#ff451a',
          flame: '#ff5c26',
          orange: '#ff7700',
          yellow: '#ffb703',
          lime: '#00f59b',
          emerald: '#10e775',
          cyan: '#00e5ff',
          cobalt: '#2563eb',
          violet: '#8b5cf6',
          magenta: '#f43f5e',
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
          500: '#00e5ff',
          600: '#0891b2',
        },
        hyper: {
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
        },
        flame: {
          400: '#ff7043',
          500: '#ff451a',
          600: '#e63910',
        },
      },
      boxShadow: {
        'glow-emerald': '0 0 25px -4px rgba(16, 231, 117, 0.45)',
        'glow-coral': '0 0 25px -4px rgba(255, 69, 26, 0.45)',
        'glow-cyan': '0 0 25px -4px rgba(0, 229, 255, 0.45)',
        'glow-violet': '0 0 25px -4px rgba(139, 92, 246, 0.45)',
        'glow-yellow': '0 0 25px -4px rgba(255, 183, 3, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
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
