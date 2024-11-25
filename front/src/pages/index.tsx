import { createRoutesView } from 'atomic-router-react'

import { AccountPasswordRoute, AccountPersonalRoute, AccountRoute } from './account'
import { ForgotPasswordRoute } from './forgot-password'
import { HomeRoute } from './home'
import { LoginRoute } from './login'
import { NotFound } from './not-found'
import { ProfileRoute } from './profile'
import { ProjectRoute } from './project'
import { SignupRoute } from './signup'

export const Pages = createRoutesView({
	routes: [
		LoginRoute,
		SignupRoute,
		ForgotPasswordRoute,
		HomeRoute,
		ProfileRoute,
		ProjectRoute,
		AccountRoute,
		AccountPersonalRoute,
		AccountPasswordRoute
	],
	otherwise() {
		return <NotFound />
	}
})
