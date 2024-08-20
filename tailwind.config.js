/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{svelte,js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

