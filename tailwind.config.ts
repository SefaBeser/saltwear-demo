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
        cream: {
          50: "#fffefb",
          100: "#faf6ee",
          200: "#f0e8dc",
        },
        sand: {
          50: "#fcf9f4",
          100: "#f3ece0",
          200: "#e5dcc8",
        },
        shell: {
          50: "#fefdfb",
          100: "#faf7f2",
        },
        sea: {
          50: "#f0fafb",
          100: "#dff5f7",
          200: "#b8eaf0",
          300: "#7dd4e0",
          400: "#3db8cc",
          500: "#1a9ead",
          600: "#158392",
          700: "#156b78",
          800: "#175862",
          900: "#184854",
        },
        lagoon: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-sm": ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        display: ["3rem", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
      },
      boxShadow: {
        soft: "0 16px 48px -12px rgba(21, 107, 120, 0.1)",
        "soft-lg": "0 28px 64px -16px rgba(23, 88, 98, 0.12)",
        card: "0 2px 20px -4px rgba(21, 107, 120, 0.07), 0 0 0 1px rgba(184, 234, 240, 0.45)",
        innerWarm: "inset 0 1px 0 0 rgba(255, 255, 255, 0.9)",
        hero: "0 40px 80px -24px rgba(21, 131, 146, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
