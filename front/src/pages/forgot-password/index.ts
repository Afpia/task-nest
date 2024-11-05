import { LayoutLogin } from '@app/layouts'
import { routes } from '@shared/config'

import { ForgotPassword } from './ui'

export const ForgotPasswordRoute = {
	view: ForgotPassword,
	route: routes.auth.forgotPassword,
	layout: LayoutLogin
}
