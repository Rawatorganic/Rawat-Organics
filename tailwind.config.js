/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        headline: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        label: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        editorial: "0 20px 40px -15px rgba(60, 25, 10, 0.08)",
      },
      colors: {
        /* ── Primary — Deep cinnamon (replaces dark forest green) ── */
        primary: "#2D1208",
        "primary-container": "#4A2010",
        "primary-fixed": "#F8DEB8",            // saffron cream — replaces mint
        "primary-fixed-dim": "#E0BC85",
        "on-primary": "#ffffff",
        "on-primary-container": "#B8946E",
        "on-primary-fixed": "#2A0F04",
        "on-primary-fixed-variant": "#5A2C16",
        "inverse-primary": "#E8B97D",

        /* ── Secondary — Saffron orange (action / highlight) ── */
        secondary: "#B8541F",
        "secondary-container": "#FFD9B5",
        "secondary-fixed": "#FFD9B5",
        "secondary-fixed-dim": "#E8B894",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#5C2D0F",
        "on-secondary-fixed": "#2A0F02",
        "on-secondary-fixed-variant": "#5C351A",

        /* ── Tertiary — Warm mustard / cardamom ── */
        tertiary: "#4A3315",
        "tertiary-container": "#312107",
        "tertiary-fixed": "#F2E1B8",
        "tertiary-fixed-dim": "#D5C28E",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#9A8A5F",
        "on-tertiary-fixed": "#1A1208",
        "on-tertiary-fixed-variant": "#3F2E13",

        /* ── Surface / background — Warm ivory ── */
        background: "#FAF6EF",
        surface: "#FAF6EF",
        "surface-bright": "#FAF6EF",
        "surface-tint": "#6B2410",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#F4F0E8",
        "surface-container": "#EFEAE0",
        "surface-container-high": "#E8E2D6",
        "surface-container-highest": "#DCD4C2",
        "surface-dim": "#DAD3C2",
        "surface-variant": "#E3DCCD",

        /* ── Foreground text ── */
        "on-surface": "#1F1A14",
        "on-surface-variant": "#4A4338",
        "on-background": "#1F1A14",

        /* ── Lines / outlines ── */
        outline: "#7A6D5C",
        "outline-variant": "#C9BEA8",

        /* ── Inverse (dark sections) ── */
        "inverse-surface": "#352E26",
        "inverse-on-surface": "#F1ECE2",

        /* ── Error (kept similar but tuned) ── */
        error: "#BA1A1A",
        "error-container": "#FFDAD6",
        "on-error": "#ffffff",
        "on-error-container": "#93000A",
      },
    },
  },
  plugins: [],
};
