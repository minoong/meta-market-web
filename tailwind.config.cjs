/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
 content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
 theme: {
  extend: {
   keyframes: {
    'snackbar-show': {
     from: {
      transform: 'translateY(100%)',
     },
     to: {
      transform: 'translateY(0)',
     },
    },
    'snackbar-hide': {
     from: {
      transform: 'translateY(0)',
     },
     to: {
      opacity: 0,
      transform: 'translateY(100%)',
     },
    },
   },
   animation: {
    'snackbar-show': 'snackbar-show .7s',
    'snackbar-hide': 'snackbar-hide .7s  both',
   },
   scale: {
    102: '1.02',
   },

   truncate: {
    lines: {
     1: '1',
     2: '2',
     3: '3',
     5: '5',
     8: '8',
    },
   },
  },
 },
 plugins: [require('flowbite/plugin'), require('tailwind-scrollbar-hide')],
}
