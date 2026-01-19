/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Configure this content array to match your project structure
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./features/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#171717',
        primary: {
          DEFAULT: '#2563eb', // blue-600
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#f3f4f6',
          foreground: '#6b7280',
        },
        border: '#e5e7eb',
        input: '#f3f4f6',
      },
      fontFamily: {
        // Platform specific logic usually handled by React Native font names,
        // but explicit mapping can be done here if custom fonts are loaded.
      }
    },
  },
  plugins: [],
}
