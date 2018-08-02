module.exports = {
  extends: ['airbnb-base', 'prettier'],
  rules: {
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    'one-var': 0,
    'prefer-destructuring': 0,
    'no-underscore-dangle': 0
  },
};
