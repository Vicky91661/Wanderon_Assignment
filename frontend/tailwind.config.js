/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0% ': { top:'50%', fontSize: '100px' },
          '100%': { top:'30%',fontSize: '150px' },
        },
        moutains: {
          '0% ': {transform:'scale(1)' },
          '100%': { transform:'scale(1.2)'  },
        }
      },
      animation: {
        wiggle: 'wiggle 1.2s ease-out forwards',
        moutains: 'moutains 1.3s ease-out forwards',
      },
      fontFamily:{
        'Inter':['Inter'],
        'Poppins':['Poppins'],
      },
    },
  },
  plugins: [],
}

