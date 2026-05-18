/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D0D12',
        secondary: '#16161F',
        tertiary: '#1E1E2A',
        accent: '#E8A427',
        'accent-dark': '#C98A1A',
        'accent-light': '#F5C842',
        'accent-muted': 'rgba(232, 164, 39, 0.15)',
        'text-primary': '#F0EDE8',
        'text-secondary': '#A8A49E',
        'danger': '#E85A27',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
