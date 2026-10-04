/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Brand Navy (#1B3A6B)
        navy: {
          50: '#F0F4FA',
          100: '#E0EAF6',
          200: '#C2D5ED',
          300: '#94B6E1',
          400: '#5F90D0',
          500: '#2C5DA0',
          600: '#1B3A6B', // CORE BRAND NAVY
          700: '#162F56',
          800: '#122646',
          900: '#0E1C33',
          950: '#070E1A',
        },
        // Core Brand Action Orange (#F97316)
        orange: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316', // PRIMARY BRAND ACTION ORANGE (#F97316)
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          950: '#431407',
        },
        // Brand Semantic Tokens
        brand: {
          navy: '#1B3A6B',
          'navy-dark': '#122646',
          'navy-light': '#2C5DA0',
          'navy-subtle': '#F0F4FA',
          orange: '#F97316',
          'orange-hover': '#EA580C',
          'orange-dark': '#C2410C',
          'orange-light': '#FB923C',
          'orange-subtle': '#FFF7ED',
        },
        surface: {
          white: '#FFFFFF',
          ground: '#FAFAFB',
          subtle: '#F8FAFC',
          muted: '#F1F5F9',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'brand': '0 4px 20px -2px rgba(27, 58, 107, 0.08)',
        'brand-lg': '0 10px 30px -4px rgba(27, 58, 107, 0.12)',
        'orange-sm': '0 2px 10px rgba(249, 115, 22, 0.20)',
        'orange-md': '0 4px 18px rgba(249, 115, 22, 0.28)',
      }
    },
  },
  plugins: [],
}
