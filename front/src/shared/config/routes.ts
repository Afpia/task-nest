import { createHistoryRouter, createRoute } from 'atomic-router'
import { sample } from 'effector'
import { createBrowserHistory } from 'history'

import { started } from './start'

// export const routes = {
// 	MAIN: '/',
// 	LOGIN: '/login',
// 	SIGNUP: '/signup',
// 	PROFILE: '/profile',
// 	ANALYTICS: '/analytics',
// 	SETTINGS: '/settings',
// 	NOTICES: '/notices',
// 	FORGOT_PASSWORD: '/forgot-password'
// }

export const routes = {
	auth: {
		login: createRoute(),
		signup: createRoute(),
		forgotPassword: createRoute()
	},
	private: {
		profile: createRoute(),
		settings: createRoute(),
		analytics: createRoute(),
		notices: createRoute(),
		home: createRoute()
	}
}

export const mappedRoutes = [
	{
		route: routes.auth.login,
		path: '/login'
	},
	{
		route: routes.auth.signup,
		path: '/signup'
	},
	{
		route: routes.auth.forgotPassword,
		path: '/forgot-password'
	},
	{
		route: routes.private.profile,
		path: '/profile'
	},
	{
		route: routes.private.settings,
		path: '/settings'
	},
	{
		route: routes.private.analytics,
		path: '/analytics'
	},
	{
		route: routes.private.notices,
		path: '/notices'
	},
	{
		route: routes.private.home,
		path: '/'
	}
]

export const router = createHistoryRouter({
	routes: mappedRoutes
})

sample({
	clock: started,
	fn: () => createBrowserHistory(),
	target: router.setHistory
})
