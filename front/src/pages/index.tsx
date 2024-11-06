import { createRoutesView } from 'atomic-router-react'

import { ForgotPasswordRoute } from './forgot-password'
import { HomeRoute } from './home'
import { LoginRoute } from './login'
import { NotFound } from './not-found'
import { ProfileRoute } from './profile'
import { SignupRoute } from './signup'

export * from './analytics'
export * from './home'

export const Pages = createRoutesView({
	routes: [LoginRoute, SignupRoute, ForgotPasswordRoute, HomeRoute, ProfileRoute],
	otherwise() {
		return <NotFound />
	}
})
