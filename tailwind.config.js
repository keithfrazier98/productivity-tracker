module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: {
          gray: {
            light: "#F2F2F2",
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
};
