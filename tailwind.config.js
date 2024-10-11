/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-purple": "#5c7fdd",
        "custom-green": "#46c185",
        "custom-blue": "#7dd8d4",
        "custom-orange": "#e3c7ad",
        "custom-teal": "#0cc3ad",
      },
    },
  },
  plugins: [],
};
