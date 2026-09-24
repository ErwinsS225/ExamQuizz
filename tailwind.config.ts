import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        surface: {
          DEFAULT: "#0f172a",
          soft: "#111c34",
          elevated: "#16233d",
          border: "#22304d",
        },
      },
      boxShadow: {
        glow: "0 0 24px -4px rgba(56,189,248,0.35)",
        card: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.6)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulse: { "50%": { opacity: ".5" } },
      },
      animation: {
        "fade-in": "fade-in .25s ease-out",
        "slide-up": "slide-up .35s cubic-bezier(.2,.7,.3,1)",
        "pulse-fast": "pulse 1s cubic-bezier(.4,0,.6,1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
