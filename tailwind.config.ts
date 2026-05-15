import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f172a", // slate-900
        foreground: "#f8fafc", // slate-50
        primary: {
          DEFAULT: "#3b82f6", // blue-500
          hover: "#2563eb", // blue-600
        },
        card: "rgba(30, 41, 59, 0.7)", // slate-800 with opacity
      },
    },
  },
  plugins: [],
};
export default config;
