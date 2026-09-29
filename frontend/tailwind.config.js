/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mayukha: {
          dark: '#141414',
          surface: '#1E1E1E',
          card: '#282828',
          border: '#3E3A36',
          gold: '#D4AF37',
          goldDark: '#AA8522',
          amber: '#E67E22',
          terracotta: '#C0392B',
          cream: '#FAF6EE',
          sand: '#EAE4D9',
          muted: '#8E8A85',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.2)',
        'deep': '0 10px 30px -5px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
