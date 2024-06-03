import { defineConfig } from "@pandacss/dev";
import pandaIconify from "panda-iconify";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  presets: [pandaIconify({ sets: ["fa6-solid", "fa6-brands", "mdi"] })],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // The output directory for your css system
  outdir: "styled-system",
});
