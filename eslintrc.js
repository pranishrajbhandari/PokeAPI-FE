module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["react", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  settings: { react: { version: "detect" } },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
  },
};
