import { LayoutLogin } from '@app/layouts'
import { routes } from '@shared/config'

import { Login } from './ui'

export const LoginRoute = {
	view: Login,
	route: routes.auth.login,
	layout: LayoutLogin
}
