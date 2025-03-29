module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    "eslint-disable-next-line": "off",
    // eslint-disable-next-line quote-props
    "quotes": "off",
    // eslint-disable-next-line quote-props
    "semi": "off",
    "comma-dangle": "off",
    "arrow-parens": "off",
    "space-before-function-paren": "off"
  }
}
