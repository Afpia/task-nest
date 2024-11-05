import { createRoutesView } from 'atomic-router-react'

import { ForgotPasswordRoute } from './forgot-password'
import { HomeRoute } from './home'
import { LoginRoute } from './login'
import { NotFound } from './not-found'
import { SignupRoute } from './signup'

export * from './analytics'
export * from './home'
export * from './profile'

export const Pages = createRoutesView({
	routes: [LoginRoute, SignupRoute, ForgotPasswordRoute, HomeRoute],
	otherwise() {
		return <NotFound />
	}
})
