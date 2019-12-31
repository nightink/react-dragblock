module.exports = {
  extends: [
    'umi',
    'eslint:recommended',
  ],
  rules: {
    'no-console': 'off'
  },
  env: {
    'browser': true,
    'node': true,
    'jest': true
  },
  globals: {
    'window': true,
  }
}

