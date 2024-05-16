module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "next",
    "google",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "import", "prettier"],
  rules: {
    "react-hooks/exhaustive-deps": "off",
    "no-unexpected-multiline": "error",
    "no-unreachable": "error",
    "require-jsdoc": 0,
    "valid-jsdoc": ["off"], // ESLintのデフォルトのJSDocチェックは非推奨のため無効化（公式情報：https://eslint.org/blog/2018/11/jsdoc-end-of-life）
    "react/jsx-curly-brace-presence": "error",
    "react/jsx-boolean-value": "error",
    eqeqeq: "error",
    "no-else-return": "error",
    curly: "error",
    quotes: ["error", "double"],
    "import/order": [
      "error",
      {
        "newlines-between": "always", // グループ間に空白行が入る
        alphabetize: {
          order: "asc", // アルファベットの昇順に並び替えられる
        },
      },
    ],
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    "@typescript-eslint/no-namespace": "off",
    "prettier/prettier": "warn",
    "new-cap": ["error", { capIsNew: false }],
  },
};
