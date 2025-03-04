/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        prompt: ['"Prompt"', "sans-serif"],
        kanit: ['"kanit"', "serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mainblue:"#2973B2",
        creame:"#F2EFE7",
        mainred:"#D32F2F"
      },
    },
  },
  plugins: [],
};
