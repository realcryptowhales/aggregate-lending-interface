// .stylelintrc.js
module.exports = {
  // 注册 stylelint 的 prettier 插件
  plugins: ['stylelint-prettier'],
  // 继承一系列规则集合
  extends: [
    // standard 规则集合
    'stylelint-config-standard',
    // standard 规则集合的 less 版本
    'stylelint-config-recommended-less',
    // 样式属性顺序规则
    'stylelint-config-recess-order',
    // 接入 Prettier 规则
    'stylelint-config-prettier',
    'stylelint-prettier/recommended'
  ],
  // 配置 rules
  rules: {
    // 开启 Prettier 自动格式化功能
    'prettier/prettier': true,
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-order': [
      /* Positioning */
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',

      /* Box Model */ /* white space between groups is ENFORCED */ 'display',
      'float',
      'width',
      'height',
      'margin',
      'padding',

      /* Typography */
      'color',
      'font',
      'line-height',
      'text-align',

      /* Visual */
      'background-color',
      'border',
      'border-radius',
      'opacity',

      /* Animation */
      'transition'
    ],
    indentation: 2,
    'max-nesting-depth': 5,
    // 'selector-max-id': [0, { severity: 'warning' }],
    'selector-max-attribute': 2,
    'selector-max-class': 5,
    'selector-max-combinators': 5,
    'selector-max-compound-selectors': 5,
    'selector-max-type': 2,
    'selector-max-universal': [0, { severity: 'warning' }],
    'selector-list-comma-newline-after': 'always',
    'block-no-empty': true,
    'comment-no-empty': true,
    'block-opening-brace-space-before': 'always',
    'block-opening-brace-space-after': 'always-single-line',
    'block-opening-brace-newline-after': 'always-multi-line',
    'block-closing-brace-newline-before': 'always-multi-line',
    'block-closing-brace-newline-after': 'always',
    'declaration-block-semicolon-newline-after': 'always',
    'declaration-colon-space-before': 'never',
    'declaration-colon-space-after': 'always',
    'length-zero-no-unit': true,
    'declaration-block-trailing-semicolon': 'always',
    'no-extra-semicolons': true,
    // 'declaration-no-important': true
  },
  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less'
    }
  ]
};
