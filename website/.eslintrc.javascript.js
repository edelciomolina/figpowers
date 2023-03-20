module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  globals: {
    "Figma": "readonly",
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "google",
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  ignorePatterns: [
    "/functions/lib/**/*", // Ignore built files.
  ],
  plugins: ["import"],
  rules: { 
    "quotes": ["error", "double"],
    "import/no-unresolved": 0,
    "indent": ["error", 2],
    "semi": [2, "never"],
    "linebreak-style": "off",
  },
}
