import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF4E00",
        secondary: "#333333",
        cream: "#FFF8F2"
      },
      fontFamily: {
        display: ["Poppins", "Inter", "sans-serif"],
        body: ["Inter", "sans-serif"]
      },
      boxShadow: {
        card: "0 2px 10px rgba(0,0,0,0.1)"
      }
    }
  },
  plugins: []
};

export default config;
