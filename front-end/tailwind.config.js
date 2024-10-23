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
            "max-mb": { max: "375px" },
            "max-md": { max: "768px" },
            "max-lg": { max: "1024px" },
            "max-xl": { max: "1290px" },
          
        },
     },
     fontFamily: {
      publicSans:["Public Sans"],
     },
  },
  plugins: [],
};
