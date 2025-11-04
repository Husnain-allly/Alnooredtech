/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#ffda1a', // custom yellow color
      },

      // ✅ Add all custom animations together
      keyframes: {
        // Existing animations
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },

        // New animations for cursor and box
        cursorMove: {
          '0%': {
            opacity: '0',
            transform: 'translate3d(300px, 0, 0) scale(1)',
          },
          '30%': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0) scale(1)',
          },
          '60%': {
            opacity: '1',
            transform: 'translate3d(-200px, -200px, 0) scale(1)',
          },
          '65%': {
            opacity: '1',
            transform: 'translate3d(-200px, -200px, 0) scale(0.95)',
          },
          '70%': {
            opacity: '1',
            transform: 'translate3d(-200px, -200px, 0) scale(1)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate3d(-300px, -50px, 0) scale(1)',
          },
        },
        boxFade: {
          '0%, 60%': { opacity: '0' },
          '65%, 100%': { opacity: '1' },
        },
      },

      animation: {
        // Existing
        slideIn: 'slideIn 0.4s ease-out forwards',
        slideOut: 'slideOut 0.4s ease-in forwards',
        fadeIn: 'fadeIn 0.5s ease-in forwards',

        // New
        cursorMove: 'cursorMove 5s ease infinite alternate',
        boxFade: 'boxFade 5s ease infinite alternate',
      },
    },
  },
  plugins: [],
};
