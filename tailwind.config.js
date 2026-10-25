/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F97316",
        },
        navy: {
          DEFAULT: "#0B1B4D",
        },
        background: {
          DEFAULT: "#FFFFFF",
          canvas: "#EEF3FA",
          input: "#F8FAFC",
        },
        content: {
          DEFAULT: "#0F172A",
          muted: "#6B7280",
          placeholder: "#9CA3AF",
        },
        border: {
          DEFAULT: "#E5E7EB",
        },
        accent: {
          blue: "#2563EB",
          "blue-tint": "#EAF0FB",
          lavender: "#EDE7F6",
          teal: "#14B8D4",
        },
        danger: {
          DEFAULT: "#EF4444",
        },
        success: {
          DEFAULT: "#22C55E",
        },
        map: {
          bg: "#EDEFF2",
          park: "#CDE8D0",
          pin: "#E53935",
        },
      },
    },
  },
  plugins: [],
};
