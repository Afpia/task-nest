import { LayoutLogin } from '@app/layouts'
import { privateAuth } from '@shared/auth'
import { routes } from '@shared/config'

import { ForgotPassword } from './ui'

export const ForgotPasswordRoute = {
	view: ForgotPassword,
	route: privateAuth(routes.auth.forgotPassword),
	layout: LayoutLogin
}
