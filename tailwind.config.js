/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF7A00',
        secondary: '#1A2E44',
        background: '#F7F8FA',
        textPrimary: '#212121',
        textSecondary: '#666666',
        success: '#1DB954',
      },
    },
  },
  plugins: [],
}