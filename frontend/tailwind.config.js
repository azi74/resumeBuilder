module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Google Sans"', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#7c3aed',
          DEFAULT: '#6d28d9',
          dark: '#5b21b6',
        },
        background: '#f8fafc',
      },
    },
  },
  plugins: [],
}