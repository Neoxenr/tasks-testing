module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint'
  ],
  extends: [
    'airbnb',
    'plugin:react/recommended',
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module',
    requireConfigFile: false,
    parser: "@babel/eslint-parser",
    babelOptions: {
      presets: ['@babel/preset-react']
    }
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['.'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }
    }
  },
  rules: {
    'one-var': [
      'error',
      'never'
    ],
    'react/jsx-uses-vars': 'warn',
    'import/prefer-default-export': 'off',
    'no-unused-vars': ['warn'],
    'react/no-unused-prop-types': 'warn',
    'react/prefer-stateless-function': 0,
    'react/button-has-type': 0,
    'import/extensions': [
      'warn',
      'never',
      {
        png: 'always'
      }
    ],
    'react/no-multi-comp': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx'
        ]
      }
    ],
    'no-console': [
      'warn',
      {
        allow: [
          'warn',
          'error'
        ]
      }
    ],
    'no-debugger': 'warn',
    'no-underscore-dangle': 0,
    'comma-dangle': 'off',
    'no-param-reassign': 'off',
    'react/destructuring-assignment': 0,
    'no-plusplus': [
      'warn',
      {
        allowForLoopAfterthoughts: true
      }
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/function-component-definition': 'off',
    'arrow-parens': 'off',
    'default-param-last': 'off',
  },
};
