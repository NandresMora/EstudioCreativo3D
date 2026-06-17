/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'metallic-charcoal': '#2c2c2e',
        'clay': '#8B7355',
        'clay-light': '#A0896C',
        'clinical-white': '#F8F9FA',
        'accent-gold': '#C9A227',
      },
      fontFamily: {
        sans: ['Geist Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
