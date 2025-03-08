module.exports = {
  // Umgebungsvariablen: Node + Browser (falls du z. B. den fetch-API checken willst)
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  // Parser-Einstellungen: ECMAScript 2020, Modules
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  // Reihenfolge in "extends":
  // 1. "eslint:recommended" oder "google"
  // 2. Weitere Plugins (z. B. "@typescript-eslint/recommended")
  // 3. "prettier" IMMER zuletzt, damit Prettier-Regeln ggf. andere Style-Regeln überschreiben.
  extends: [
    "eslint:recommended",
    "google",
    // Falls du reines JS hast, kannst du "plugin:@typescript-eslint/recommended" weglassen
    // "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  // Deine individuellen Regeln
  rules: {
    // Alte Regeln beibehalten
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", { allowTemplateLiterals: true }],

    // Neue Regeln
    "max-len": ["error", { code: 100 }],               // Erlaubt 100 Zeichen pro Zeile
    "object-curly-spacing": ["error", "always"],       // Leerzeichen innerhalb von { }
    "no-trailing-spaces": "error",                     // Keine Leerzeichen am Zeilenende
    "comma-dangle": ["error", "always-multiline"],     // KommaAmEnde by mehrzeil. Arrays/Objekten
    "indent": ["error", 2],                            // 2 Leerzeichen als Einrückung
    "padded-blocks": ["error", "never"],               // Keine Leerzeilen am Block-Anfang/-Ende
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
