/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        webextensions: true,
    },
    extends: "eslint:recommended",
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {},
    ignorePatterns: ["node_modules/", "dist/"],
};
