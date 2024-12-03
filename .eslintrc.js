module.exports = {
    env: {
      browser: true,
      es2021: true
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended'
    ],
    rules: {
      'react/prop-types': 'off'
    }
  }