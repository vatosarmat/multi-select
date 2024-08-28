import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "figma-color-border-primary": "rgba(19, 8, 23, 0.1)",
        "figma-color-border-secondary": "rgba(19, 8, 23, 0.05)",
        "figma-color-border-accent": "rgba(110, 50, 140, 0.48)",
        "figma-color-icons-disabled": "rgba(19, 8, 23, 0.3)",
        "figma-color-text-primary": "rgba(19, 8, 23, 0.9)",
        "figma-color-text-tertiary": "rgba(19, 8, 23, 0.4)",
        "figma-color-text-accent": "rgba(110, 50, 140, 1)",
        "figma-color-bg-interactive-primary": "rgba(19, 8, 23, 0.05)",
        "figma-color-bg-accent-violet": "rgba(110, 50, 140, 1)",
        "figma-color-bg-surface-secondary-accent": "rgba(110, 50, 140, 0.06)",
      },
      fontSize: {
        "figma-text-body-default": [
          "15px",
          {
            lineHeight: "22px",
            letterSpacing: "-0.012em",
            fontWeight: "500",
          },
        ],
        "figma-text-body-accent": [
          "15px",
          {
            lineHeight: "20px",
            letterSpacing: "-0.016em",
            fontWeight: "600",
          },
        ],
        "figma-text-body-caption": [
          "13px",
          {
            lineHeight: "18px",
            letterSpacing: "-0.006em",
            fontWeight: "500",
          },
        ],
        "figma-text-12": [
          "12px",
          {
            lineHeight: "16px",
            letterSpacing: "-0.006em",
            fontWeight: "500",
          },
        ],
      },
      boxShadow: {
        "figma-drop-shadow": "0px 0px 0px 3px rgba(113, 48, 142, 0.12);",
      },
    },
  },
  plugins: [],
} satisfies Config;
