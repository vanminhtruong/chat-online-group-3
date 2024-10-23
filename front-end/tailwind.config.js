/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
     extend: {
        colors: {
          white:" #ffffff",
          bg:"#F3F4F6",
          bgMess:"#6366F1",
          textMess:"text-gray-600"
        },
        screens: {
          
        },
     },
     fontFamily: {
      publicSans:["Public Sans"],
     },
  },
  plugins: [],
};
