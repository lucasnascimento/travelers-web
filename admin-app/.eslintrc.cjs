module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "airbnb",
    "airbnb-typescript",
    "plugin:storybook/recommended"
  ],
  "plugins": [
    "@typescript-eslint",
    "react",
    "react-refresh",
    "sort-destructure-keys",
    "jest"
  ],
  "ignorePatterns": [
    "dist",
    "vite.config.ts"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": ["./tsconfig.json", "./tsconfig.node.json"],
    "tsconfigRootDir": __dirname
  },
  "globals": {
    "JSX": true,
    "React": true
  },
  "rules": {
    "import/no-cycle": 0,
    "react/no-unescaped-entities": 0,
    "react-refresh/only-export-components": [
      "warn",
      {
        "allowConstantExport": true
      }
    ],
    "comma-dangle": [
      "error",
      {
        "arrays": "always-multiline",
        "exports": "always-multiline",
        "functions": "never",
        "imports": "always-multiline",
        "objects": "always-multiline"
      }
    ],
    "@typescript-eslint/comma-dangle": [
      "error",
      {
        "arrays": "always-multiline",
        "exports": "always-multiline",
        "functions": "never",
        "imports": "always-multiline",
        "objects": "always-multiline"
      }
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": [
          "jest.setup.ts",
          "playwright.config.ts",
          "**/*.test.js",
          "**/*.test.jsx",
          "**/*.test.ts",
          "**/*.test.tsx",
          "**/*.spec.js",
          "**/*.spec.jsx",
          "**/*.spec.ts",
          "**/*.spec.tsx",
          "**/*.stories.js",
          "**/*.stories.jsx",
          "**/*.stories.ts",
          "**/*.stories.tsx"
        ]
      }
    ],
    "import/no-unresolved": "error",
    "import/prefer-default-export": 0,
    "max-len": [
      "error",
      {
        "code": 80,
        "ignoreComments": true,
        "ignoreRegExpLiterals": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignoreTrailingComments": true,
        "ignoreUrls": true,
        "tabWidth": 2
      }
    ],
    "max-params": [
      "error",
      {
        "max": 3
      }
    ],
    "multiline-ternary": [
      "error",
      "always-multiline"
    ],
    "react/function-component-definition": [
      1,
      {
        "namedComponents": "arrow-function"
      }
    ],
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ]
      }
    ],
    "react/jsx-props-no-spreading": "off",
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": 0,
    "@typescript-eslint/semi": [
      "error",
      "never"
    ],
    "semi": [
      "error",
      "never"
    ],
    "sort-destructure-keys/sort-destructure-keys": 2,
    "sort-keys": [
      "error"
    ],
    "sort-vars": [
      "error"
    ],
    "space-before-function-paren": [
      2,
      "always"
    ],
    "@typescript-eslint/no-explicit-any": 1,
    "@typescript-eslint/no-unused-vars": [
      "error"
    ],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": [
      "error"
    ],
    "no-console": 1,
    "sort-imports": [
      "error",
      {
        "ignoreDeclarationSort": true
      }
    ]
  }
}
