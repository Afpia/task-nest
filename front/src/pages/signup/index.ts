import { LayoutLogin } from '@app/layouts'
import { privateAuth } from '@shared/auth'
import { routes } from '@shared/config'

import { SignUp } from './ui'

export const SignupRoute = {
	view: SignUp,
	route: privateAuth(routes.auth.signup),
	layout: LayoutLogin
}
