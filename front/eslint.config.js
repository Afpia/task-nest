import { eslint } from '@afpia/eslint'

export default eslint(
	{ typescript: true, jsx: true, jsxA11y: true, react: true },
	{
		rules: {
			'antfu/if-newline': 'off',
			'style/operator-linebreak': 'off',
			'style/member-delimiter-style': [
				'error',
				{
					multiline: {
						delimiter: 'none',
						requireLast: false
					},
					singleline: {
						delimiter: 'semi',
						requireLast: false
					}
				}
			],
			'style/quote-props': ['error', 'as-needed']
		}
	}
)
