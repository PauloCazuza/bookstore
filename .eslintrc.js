module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "react-native/react-native": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "react-native",
        "react-hooks"
    ],
    "rules": {
        "react-native/no-unused-styles": 2,
        "react-native/split-platform-components": 2,
        "react-native/no-inline-styles": 2,
        "react-native/no-color-literals": 2,
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "react-hooks/rules-of-hooks": "error", // Verifica as regras dos Hooks
        "react-hooks/exhaustive-deps": "warn" // Verifica as dependências de effects
    }
}
