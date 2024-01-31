module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb-typescript',
        'plugin:import/typescript',
        'plugin:react/recommended',
        'prettier',
        'plugin:import/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        'react/state-in-constructor': 'off',
        'react/react-in-jsx-scope': ['off'],
        'react/jsx-uses-react': ['off'],
        'react/jsx-props-no-spreading': ['warn'],
        'react/no-unescaped-entities': ['off'],
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: false, optionalDependencies: false, peerDependencies: false },
        ],
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/ignore': ['react-native'],
    },
    ignorePatterns: ['.eslintrc.js'],
};
