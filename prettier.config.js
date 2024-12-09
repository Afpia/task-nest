import config from '@afpia/prettier'

export default {
	...config,
	arrowParens: 'always',
	importOrder: [
		'<BUILTIN_MODULES>',
		'^react$',
		'^(.*react.*)$',
		'<THIRD_PARTY_MODULES>',
		'',
		'^(?!@(utils|assets|shared|widgets|entities|pages|features|app|ui|api)(/.*|$)).*@',
		'',
		'^(@utils|@assets|@shared|@widgets|@entities|@pages|@features|@app|@ui|@api)(/.*)$',
		'',
		'^\\.\\./.*$',
		'',
		'^(?!.*[.](css|scss)$)[./].*$',
		'',
		'.(css|scss)$'
	],
	plugins: ['@ianvs/prettier-plugin-sort-imports']
}
