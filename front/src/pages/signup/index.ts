import { LayoutLogin } from '@app/layouts'
import { routes } from '@shared/config'

import { SignUp } from './ui'

export const SignupRoute = {
	view: SignUp,
	route: routes.auth.signup,
	layout: LayoutLogin
}
