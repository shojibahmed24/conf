/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./admin/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10b981', // Emerald
          dark: '#059669',
          light: '#34d399',
        },
        secondary: {
          DEFAULT: '#fbbf24', // Gold
          dark: '#d97706',
          light: '#fcd34d',
        },
        background: '#f8fafc', // Slate 50
        text: {
          main: '#18181b', // Zinc 900
          muted: '#52525b', // Zinc 600
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        arabic: ['Amiri', 'serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
}