/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  useTabs: false,
  tabWidth: 2,
  singleQuote: false,
  trailingComma: "none",
  bracketSameLine: true,
  printWidth: 999999,
  plugins: ["prettier-plugin-tailwindcss"]
};

export default config;
