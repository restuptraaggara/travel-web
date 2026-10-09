/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FAF8F5',
        forest: {
          DEFAULT: '#1B4332',
          light: '#2D6A4F',
          dark: '#17231C',
          50: '#F2F7F4',
          100: '#E2EFE7',
          600: '#1B4332',
          700: '#153628',
          900: '#17231C',
        },
        terracotta: {
          DEFAULT: '#C86D51',
          light: '#D4A373',
          dark: '#B0563B',
        },
        sand: '#EAE6DF',
        charcoal: '#17231C',
        body: '#4A554E',
        muted: '#859088',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm-card': '0 4px 20px -2px rgba(27, 67, 50, 0.06)',
        'warm-hover': '0 12px 30px -4px rgba(27, 67, 50, 0.12)',
      },
    },
  },
  plugins: [],
}
