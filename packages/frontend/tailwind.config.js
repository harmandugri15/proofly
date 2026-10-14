/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // Artisanal Warm Organic Palette inspired by specialty studio design
        cream: {
          50: '#FDFBF8',
          100: '#FAF7F2', // Primary base background
          200: '#F4EFE6', // Light card fill
          300: '#EBE5D8', // Surface borders
          400: '#DDD5C4', // Muted borders
          500: '#C7BC9F',
        },
        sage: {
          50: '#F3F6F4',
          100: '#E4ECE6',
          200: '#C7D9CD',
          300: '#A3BFAC',
          400: '#86A791', // Muted sage
          500: '#74947F', // Primary hero sage
          600: '#5F826B',
          700: '#4D6D58',
          800: '#385241',
          900: '#24362A', // Deep forest
          950: '#1A271E',
        },
        terracotta: {
          50: '#FDF6F2',
          100: '#FAE8DF',
          200: '#F4CDBC',
          300: '#ECA88F',
          400: '#E28461',
          500: '#D97043', // Signature burnt terracotta action button
          600: '#C55F34', // Hover terracotta
          700: '#A84C25',
          800: '#853C1E',
          900: '#5F2913',
        },
        forest: {
          900: '#1F2C23', // Primary dark text
          800: '#2D3E32', // Secondary dark text
          700: '#405446', // Body text
          600: '#586E5F', // Muted secondary text
          500: '#758C7D', // Subtle text
        },
        sand: {
          50: '#FAF8F5',
          100: '#F5F1E9',
          200: '#EDE8DF',
          300: '#E0D9CD',
          400: '#CEC4B4',
        },
        // Retain compatibility keys mapped to harmonious tones
        dark: {
          950: '#1A271E',
          900: '#1F2C23',
          850: '#24362A',
          800: '#2D3E32',
          750: '#385241',
          700: '#4D6D58',
        },
        studio: {
          coral: '#D97043',
          flame: '#C55F34',
          orange: '#D97043',
          yellow: '#D4A359',
          lime: '#5F826B',
          emerald: '#4D6D58',
          cyan: '#5B8C85',
          cobalt: '#3D5A80',
          violet: '#7A6B8A',
          magenta: '#B85D6B',
        },
      },
      borderRadius: {
        'organic': '36px',
        'organic-lg': '44px',
        'pill': '9999px',
      },
      boxShadow: {
        'soft-cream': '0 4px 20px -2px rgba(45, 62, 50, 0.05)',
        'soft-elevated': '0 12px 30px -4px rgba(45, 62, 50, 0.08)',
        'sage-glow': '0 8px 24px -4px rgba(116, 148, 127, 0.25)',
        'terracotta': '0 8px 24px -4px rgba(217, 112, 67, 0.35)',
      },
      animation: {
        'spin-slow': 'spin-slow 24s linear infinite',
        'float-gentle': 'float-gentle 5s ease-in-out infinite',
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}
