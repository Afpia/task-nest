import { chainRoute } from 'atomic-router'

import { LayoutLogin } from '@app/layouts'
import { $user, privateAuth, privateMain } from '@shared/auth'
import { routes } from '@shared/config'

import { Login } from './ui'

export const LoginRoute = {
	view: Login,
	route: privateAuth(routes.auth.login),
	layout: LayoutLogin
}

// chainRoute({
// 	route: privateMain(routes.auth.login),
// 	// beforeOpen: privateAuth
// 	opened: privateAuth
// })
