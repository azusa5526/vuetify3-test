module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/vue3-recommended',
		'eslint:recommended',
		'@vue/eslint-config-typescript',
		'plugin:prettier/recommended',
		'eslint-config-prettier',
	],
	rules: {
		'vue/multi-word-component-names': 'off',
		'vue/component-definition-name-casing': ['error', 'kebab-case'],
	},
	plugins: ['vue', 'prettier'],
};
