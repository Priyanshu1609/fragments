module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sora: ["'Sora'"],
      montserrat: ["'Montserrat'"],
    },
    extend: {
      screens: {
        xs: { max: '425px' },
        sm: { max: '768px' },
        'max-lg': { max: '1024px' },
      },
      colors: {
        input: {
          DEFAULT: '#232529',
        },
        button: {
          DEFAULT: '#2BFFB1',
        }
      },
      fontFamily: {
        britanica: 'BritanicaBlack'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
    // ...
  ]
}
