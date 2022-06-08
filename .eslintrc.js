module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', '@vue/standard'],
    rules: {
        semi: [0],
        indent: ['off', 'tab', { SwitchCase: 1 }],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'space-before-function-paren': 'error',
        'camelcase': 'off',
        'semi-spacing': 'error',
        'vue/no-parsing-error': [
            2,
            {
                'x-invalid-end-tag': false
            }
        ]
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};