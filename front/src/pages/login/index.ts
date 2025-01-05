import { LayoutLogin } from '@app/layouts'
import { privateAuth } from '@shared/auth'
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
