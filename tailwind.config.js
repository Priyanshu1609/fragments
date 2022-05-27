module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sora: ["'Sora'"],
    },
    extend: {
      screens: {
        xs: { max: '425px' },
        sm: { max: '768px' },
        'max-lg': { max: '1024px' },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
    // ...
  ]
}
