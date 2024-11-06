import { createHistoryRouter, createRoute } from 'atomic-router'
import { sample } from 'effector'
import { createBrowserHistory } from 'history'

import { path } from './path'
import { started } from './start'

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
		path: path.LOGIN
	},
	{
		route: routes.auth.signup,
		path: path.SIGNUP
	},
	{
		route: routes.auth.forgotPassword,
		path: path.FORGOT_PASSWORD
	},
	{
		route: routes.private.profile,
		path: path.PROFILE
	},
	{
		route: routes.private.settings,
		path: path.SETTINGS
	},
	{
		route: routes.private.analytics,
		path: path.ANALYTICS
	},
	{
		route: routes.private.notices,
		path: path.NOTICES
	},
	{
		route: routes.private.home,
		path: path.HOME
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
