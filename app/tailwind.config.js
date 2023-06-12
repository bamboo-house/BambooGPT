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
    // 追加してeslintの警告が出る場合は.eslintrc.jsonで除外する
    extend: {
      colors: {
        'gpt-dark': '#202123',
        'gpt-gray': '#353740',
        'gpt-gray2': '#40414E',
      },
      backgroundImage: {
        'gpt-linear-gradient': 'linear-gradient(180deg,rgba(53,55,64,0),#353740 58.85%)',
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
