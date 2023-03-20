module.exports = {
  overrides: [
    {
      files: ["*.js"],
      extends: "./.eslintrc.javascript.js",
    },
    {
      files: ["*.ts"],
      extends: "./.eslintrc.typescript.js",
    },
  ],
}
