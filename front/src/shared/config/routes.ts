import { createHistoryRouter, createRoute, createRouterControls } from 'atomic-router'
import { merge, sample } from 'effector'
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
		home: createRoute(),
		project: createRoute<{ projectId: string }>()
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
	},
	{
		route: routes.private.project,
		path: path.PROJECT
	}
]

const privateRoutes = Object.values(routes.private)
export const privateRouteOpened = merge(privateRoutes.map((route) => route.opened))

export const controls = createRouterControls()

export const router = createHistoryRouter({
	routes: mappedRoutes,
	controls
})

sample({
	clock: started,
	fn: () => createBrowserHistory(),
	target: router.setHistory
})
