/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 追加してeslintの警告が出る場合は.eslintrc.jsonで除外する
        'gpt-gray': '#343540',
        'gpt-dark': '#202123',
      },
    },
    screens: {
      sm: { max: '560px' },
      md: { max: '768px' },
      tb: { max: '960px' },
    },
  },
  plugins: [],
};
