module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth:{
        '3/4': '75%',
        '1/2': '50%',
        '1/4': '25%',
      },
      fontFamily:{
        'ubuntu': ['"Ubuntu"', 'sans-serif']
      },
      colors: {
        'kalloba': '#121535',
      },
    },
  },
  plugins: [],
}
